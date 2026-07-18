const fs = require('fs');
const path = require('path');

const inputDir = '/Users/martinsramek/leapparkour.cz/scraped/blog_unzipped/LeapParkour_Blog_Scraped';
const outputFile = '/Users/martinsramek/leapparkour.cz/lib/blog.ts';

// Deleting custom SEO blog posts as requested
const customPosts = [];

const files = fs.readdirSync(inputDir).filter(f => f.endsWith('.md'));
const parsedPosts = [];

for (const file of files) {
  const filePath = path.join(inputDir, file);
  const rawContent = fs.readFileSync(filePath, 'utf-8');
  const lines = rawContent.split('\n');
  
  let title = '';
  let date = '';
  let author = 'Daniel Pospíchal';
  let bodyStartIndex = -1;
  let bodyEndIndex = -1;
  
  // Find the metadata line
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (line.includes('Daniel Pospíchal') || line.includes('leapparkourseznam-cz') || line.includes('DAN0513')) {
      const dateMatch = line.match(/(\d{1,2}\.\d{1,2}\.\s*\d{4})/);
      if (dateMatch) {
        date = dateMatch[1].trim();
      }
      
      const cleanLine = line.replace(/\[.*?\]\(.*?\)/g, '');
      const parts = line.split('[');
      title = parts[0].trim();
      
      bodyStartIndex = i + 1;
      break;
    }
  }
  
  if (bodyStartIndex === -1) {
    title = lines[0].replace(/^#\s*/, '').trim();
    date = '1. 8. 2020';
    bodyStartIndex = 5;
  }
  
  // Find content end
  for (let i = bodyStartIndex; i < lines.length; i++) {
    const line = lines[i];
    if (line.trim() === 'Komentáře' || line.trim() === 'Hledat' || line.includes('Kategorie') || line.includes('Podporují nás')) {
      bodyEndIndex = i;
      break;
    }
  }
  
  if (bodyEndIndex === -1) {
    bodyEndIndex = lines.length;
  }
  
  // Extract body lines
  let bodyLines = lines.slice(bodyStartIndex, bodyEndIndex)
    .map(line => line.trim())
    .filter(line => line !== '');
    
  // Clean up content
  bodyLines = bodyLines.map(line => {
    line = line.replace(/\[\]\(https:\/\/web\.archive\.org\/web\/\d+(?:if_)?\/https:\/\/leapparkour\.cz\/wp-content\/uploads\/\d+\/\d+\/(.*?)\)/g, '![$1](/images/$1)');
    line = line.replace(/https:\/\/web\.archive\.org\/web\/\d+(?:if_)?\/https:\/\/leapparkour\.cz\//g, '/');
    line = line.replace(/https:\/\/web\.archive\.org\/web\/\d+(?:if_)?\//g, '');
    return line;
  });
  
  // Convert Markdown to HTML
  let htmlContent = '';
  let inList = false;
  
  for (const line of bodyLines) {
    if (line.startsWith('![')) {
      // Image - check if file exists locally to prevent 404s and node crash
      const match = line.match(/!\[(.*?)\]\((.*?)\)/);
      if (match) {
        const cleanFilename = decodeURIComponent(match[2]);
        const localPath = path.join('/Users/martinsramek/leapparkour.cz/public', cleanFilename);
        if (fs.existsSync(localPath)) {
          htmlContent += `<div className="my-6 relative aspect-video overflow-hidden rounded-2xl"><img src="${cleanFilename}" alt="${match[1]}" className="w-full h-full object-cover" /></div>\n`;
        } else {
          // Skip if missing to avoid 404 loop and SWC malloc crashes
          console.log(`Skipping missing image: ${cleanFilename} in ${file}`);
        }
      }
    } else if (line.startsWith('# ') || line.startsWith('## ') || line.startsWith('### ') || line.startsWith('#### ')) {
      if (inList) { htmlContent += '</ul>\n'; inList = false; }
      
      let headingText = line.replace(/^#+\s*/, '')
        .replace(/\*\*/g, '')
        .replace(/\*/g, '')
        .trim();
        
      if (line.startsWith('# ')) {
        htmlContent += `<h2>${headingText}</h2>\n`;
      } else if (line.startsWith('## ')) {
        htmlContent += `<h2>${headingText}</h2>\n`;
      } else {
        htmlContent += `<h3>${headingText}</h3>\n`;
      }
    } else if (line.startsWith('* ') || line.startsWith('- ')) {
      if (!inList) { htmlContent += '</ul>\n'; inList = true; }
      
      let itemText = line.replace(/^[\*\-]\s*/, '');
      itemText = itemText.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
      itemText = itemText.replace(/\*(.*?)\*/g, '<em>$1</em>');
      itemText = itemText.replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2">$1</a>');
      itemText = itemText.replace(/[\*_]/g, '');
      
      htmlContent += `<li>${itemText}</li>\n`;
    } else {
      if (inList) { htmlContent += '</ul>\n'; inList = false; }
      
      let paraText = line;
      paraText = paraText.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
      paraText = paraText.replace(/\*(.*?)\*/g, '<em>$1</em>');
      paraText = paraText.replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2">$1</a>');
      paraText = paraText.replace(/[\*_#]/g, '');
      
      htmlContent += `<p>${paraText}</p>\n`;
    }
  }
  if (inList) htmlContent += '</ul>\n';
  
  const slug = file.replace(/\.md$/, '').toLowerCase();
  const cleanText = htmlContent.replace(/<[^>]*>/g, ' ');
  const excerpt = cleanText.split('.').slice(0, 2).join('.') + '.';
  
  let coverImage = '/images/2024_08_DSC05433.jpg';
  const imgMatch = htmlContent.match(/img src="(.*?)"/);
  if (imgMatch) {
    const cleanImgPath = imgMatch[1];
    const localImgPath = path.join('/Users/martinsramek/leapparkour.cz/public', cleanImgPath);
    if (fs.existsSync(localImgPath)) {
      coverImage = cleanImgPath;
    }
  }
  
  parsedPosts.push({
    slug,
    title: title.replace(/[\*_#]/g, '').trim() || file.replace(/\.md$/, '').replace(/-/g, ' '),
    excerpt: excerpt.length > 200 ? excerpt.slice(0, 200).replace(/[\*_#]/g, '') + '...' : excerpt.replace(/[\*_#]/g, ''),
    metaDescription: title.replace(/[\*_#]/g, '').trim() + " - Přečtěte si článek z blogu Leap Parkour.",
    date: date || '20. 8. 2018',
    author: author,
    coverImage: coverImage,
    readTime: '3 min čtení',
    content: htmlContent.trim()
  });
}

const allPosts = [...customPosts, ...parsedPosts];

const outputContent = `export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  author: string;
  coverImage: string;
  readTime: string;
  metaDescription: string;
}

export const BLOG_POSTS: BlogPost[] = ${JSON.stringify(allPosts, null, 2)};
`;

fs.writeFileSync(outputFile, outputContent, 'utf-8');
console.log(`Successfully parsed ${parsedPosts.length} historical blog posts with image safety checks!`);
