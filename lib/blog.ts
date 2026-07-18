export interface BlogPost {
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

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "proc-je-parkour-skvely-sport-pro-deti",
    title: "Proč je parkour skvělý sport pro zdravý vývoj dětí?",
    excerpt: "Parkour není jen o skákání přes zídky. Zjistěte, jak všestranně rozvíjí fyzickou kondici, koordinaci, sebekontrolu a mentální odolnost dětí.",
    metaDescription: "Proč přihlásit dítě na parkour? Zjistěte, jak tento všestranný sport rozvíjí koordinaci, sílu, sebedůvěru a mentální disciplínu u dětí.",
    date: "15. července 2026",
    author: "Tým Leap Parkour",
    coverImage: "/images/2024_08_DSC05433.jpg",
    readTime: "4 min čtení",
    content: `
      <p>Hledáte pro své dítě sport, který ho bude skutečně bavit, zvedne ho od obrazovky telefonu a zároveň mu poskytne komplexní fyzickou průpravu? Parkour se v posledních letech stal jedním z nejpopulárnějších pohybových směrů u dětí a mládeže. A není se čemu divit.</p>
      
      <h2>1. Všestranný fyzický rozvoj bez jednostranného přetěžování</h2>
      <p>Na rozdíl od mnoha tradičních sportů, které se často zaměřují na specifické svalové skupiny (např. fotbal na dolní končetiny, tenis na dominantní ruku), parkour zapojuje celé tělo. Běh, skoky, lezení, balancování a přelézání překážek vyžadují spolupráci všech svalových partií. Dítě si tak přirozenou vahou vlastního těla buduje:</p>
      <ul>
        <li><strong>Střed těla (core):</strong> klíčový pro správné držení těla a prevenci bolestí zad.</li>
        <li><strong>Dynamickou sílu a výbušnost:</strong> důležité pro skoky a rychlé reakce.</li>
        <li><strong>Flexibilitu a kloubní mobilitu:</strong> které chrání tělo před zraněním.</li>
      </ul>

      <h2>2. Rozvoj koordinace a prostorové orientace</h2>
      <p>Parkour učí děti dokonale vnímat své tělo v prostoru. Správně odhadnout vzdálenost překážky, načasovat odraz, koordinovat pohyb rukou a nohou při dopadu – to vše vyžaduje intensivní zapojení mozku a nervové soustavy. Tyto koordinační schopnosti, které se děti na parkouru naučí, pak skvěle využijí v jakémkoliv jiném sportu i v každodenním životě.</p>

      <h2>3. Budování zdravé sebedůvěry a překonávání strachu</h2>
      <p>Každá nová překážka v parkouru představuje výzvu. Když se dítě naučí nový prvek (např. bezpečný přeskok překážky), zažije okamžitý pocit úspěchu. Parkour učí děti pracovat se strachem – ne ho ignorovat, ale pochopit ho, zhodnotit své schopnosti a postupnými kroky překážku bezpečně překonat. Tento přístup si děti podvědomě přenášejí i do školy a osobního života: překážky tu nejsou od toho, aby nás zastavily, ale abychom našli cestu, jak je překonat.</p>

      <h2>4. Komunita a nesoutěžní prostředí</h2>
      <p>Jedním z nejkrásnějších aspektů parkouru je jeho filozofie. V parkouru se nesoutěží o medaile – hlavním soupeřem je člověk sám sobě a jeho včerejší verze. Na našich kroužcích v Havlíčkově Brodě podporujeme přátelskou atmosféru, kde starší a zkušenější děti pomáhají těm mladším. Parkour tak učí respektu, spolupráci a vzájemné podpoře.</p>

      <blockquote>
        „Parkour učí děti přirozenému pohybu. Místo abychom je svazovali striktními pravidly, učíme je kreativně využívat prostředí kolem sebe k bezpečnému a efektivnímu pohybu.“
      </blockquote>

      <h2>Závěr: Jak začít?</h2>
      <p>Pokud chcete, aby vaše dítě zažilo radost z přirozeného pohybu pod dohledem zkušených trenérů, podívejte se na naše <a href="/krouzek">parkourové kroužky v Havlíčkově Brodě</a>. Nabízíme tréninky jak pro úplné začátečníky od 6 let, tak pro pokročilé teenagery.</p>
    `
  },
  {
    slug: "bezpecnost-pri-parkouru-myty-vs-realita",
    title: "Bezpečnost při parkouru: Mýty versus realita",
    excerpt: "Bojíte se, že je parkour nebezpečný hazard? Přečtěte si, jak probíhají tréninky v tělocvičně, jak učíme děti bezpečné pády a jak předcházíme zraněním.",
    metaDescription: "Je parkour nebezpečný pro děti? Přečtěte si o metodice bezpečného tréninku, nácviku dopadů (rollů) a prevenci zranění pod vedením trenérů.",
    date: "10. června 2026",
    author: "Tým Leap Parkour",
    coverImage: "/images/2024_08_krouzek.jpg",
    readTime: "5 min čtení",
    content: `
      <p>Při slově „parkour“ si mnoho rodičů představí šílené skoky ze střechy na střechu, které znají z virálních videí na YouTube. Není se čemu divit, že mají obavy o bezpečnost svých dětí. Jaká je ale realita organizovaného parkouru pod vedením zkušených trenérů? Pojďme se podívat na nejčastější mýty a na to, jak bezpečnost na našich trénincích ve skutečnosti zajišťujeme.</p>

      <h2>Mýtus 1: Parkour is extrémní a nebezpečný sport plný zranění</h2>
      <p><strong>Realita:</strong> Podle statistik úrazovosti je organizovaný parkour výrazně bezpečnější než například fotbal, hokej nebo florbal. Proč tomu tak je? V parkouru nedochází k přímému kontaktu se soupeřem (nehrozí fauly, srážky v rychlosti) a hlavním pilířem celého tréninku je <strong>metodická příprava a sebekontrola</strong>.</p>

      <h2>Jak na kroužcích předcházíme zraněním?</h2>
      
      <h3>1. Absolutní základ: Dopady a pády (Landing & Roll)</h3>
      <p>První věc, kterou učíme každého začátečníka, není jak vysoko vyskočit, ale <strong>jak bezpečně dopadnout a spadnout</strong>. Dopadová technika (tzn. tlumení nárazu přes špičky a kolena do dřepu) a parkourový kotoul (roll), který rozkládá energii pádu na celá záda, jsou nejdůležitější dovednosti. Dokud dítě bezpečně nezvládne dopad z malé výšky, nepouštíme ho na vyšší překážky.</p>

      <h3>2. Kontrolované prostředí tělocvičny</h3>
      <p>Naše kroužky v Havlíčkově Brodě probíhají v tělocvičně ZŠ Wolkerova. K dispozici máme bohaté vybavení: švédské bedny, kozy, hrazdy, ale hlavně <strong>množství žíněnek, duchn a dopadových matrací</strong>. Děti si tak nové a obtížnější prvky zkoušejí do měkkého, což eliminuje riziko zranění při případném nezdaru.</p>

      <h3>3. Postupná progrese (od jednoduchého k těžšímu)</h3>
      <p>Tréninky jsou striktně strukturované. Nikdy nepřeskakujeme základy. Každý pohybový prvek má své průpravné fáze. Děti se učí trpělivosti – vědí, že k velkému skoku vede cesta přes desítky malých, precizně zvládnutých opakování při zemi.</p>

      <h3>4. Vedení kvalifikovanými trenéry</h3>
      <p>Naši trenéři sami aktivně skáčou řadu let a mají odborné trenérské licence. Vždy jsou u překážek přítomni, provádějí tzv. záchranu (spotting) – fyzicky dítě jistí při provádění nového prvku, aby zabránili nekontrolovanému pádu.</p>

      <blockquote>
        „Bezpečný parkour je ten, který vypadá hladce a kontrolovaně. Hrdinství a zbytečný risk na trénink nepatří. Učíme děti znát své limity.“
      </blockquote>

      <h2>Závěr</h2>
      <p>Parkour v našem podání není hazard se zdravím, ale naopak systematický rozvoj pohybové inteligence. Děti se učí, jak ovládat své tělo, což jim pomáhá předcházet úrazům nejen v tělocvičně, ale i venku na hřišti, při zakopnutí na ulici nebo při jiných sportovních aktivitách.</p>
    `
  },
  {
    slug: "tabor-leap-camp-pohyb-zabava-kamaradi",
    title: "Leap Camp: Co čekat od nejlepšího parkourového tábora?",
    excerpt: "Léto plné skákání, her, natáčení videí a chatkové pohody. Přečtěte si podrobný pohled na náš letní tábor Leap Camp pro kluky a holky od 8 do 16 let.",
    metaDescription: "Co čeká děti na parkourovém táboře Leap Camp? Objevte denní program, výběr sportů, ubytování v RS Radost a bezpečnostní zázemí tábora.",
    date: "25. května 2026",
    author: "Tým Leap Parkour",
    coverImage: "/images/2024_08_TABOROVA2022.jpg",
    readTime: "6 min čtení",
    content: `
      <p>Každé léto organizujeme vrchol naší celoroční činnosti – letní tábor <strong>Leap Camp</strong>. Je to týden plný intenzivního tréninku, skvělých her, navazování nových přátelství a nezapomenutelných zážitků. Pokud přemýšlíte, zda své dítě na tábor přihlásit, přinášíme vám detailní pohled na to, jak to na Leap Campu vypadá.</p>

      <h2>RS Radost u Světlé nad Sázavou: Ideální zázemí</h2>
      <p>Náš tábor se koná v prověřeném Rekreačním středisku Radost, které se nachází v krásném lesním prostředí u Nové Vsi u Světlé nad Sázavou. Středisko nabízí perfektní infrastrukturu:</p>
      <ul>
        <li>Ubytování v útulných chatkách či pokojích.</li>
        <li>Plnou penzi 5x denně a nepřetržitý pitný režim.</li>
        <li>Rozsáhlé travnaté plochy, hřiště a blízkost vody pro doplňkové aktivity.</li>
        <li>Vnitřní prostory pro případ nepříznivého počasí.</li>
      </ul>

      <h2>Na co se děti mohou těšit?</h2>
      
      <h3>1. Parkourové workshopy pro všechny úrovně</h3>
      <p>Hlavní náplní jsou samozřejmě tréninky parkouru. Stavíme vlastní venkovní překážkové dráhy, využíváme hrazdy, bedny a bezpečné dopadové zóny. Děti jsou rozděleny do skupin podle své pokročilosti a věku, takže si na své přijde jak úplný začátečník, tak pokročilý parkourista, který chce pilovat akrobacii a salta.</p>

      <h3>2. Výběr sportů na míru (Novinka!)</h3>
      <p>Chceme, aby byl program pro dětí co nejvíce atraktivní. Proto si každé dítě při přihlašování volí sporty a aktivity, které by si chtělo vyzkoušet. Podle zájmu pak do programu zařazujeme:</p>
      <ul>
        <li>Týmové střílečky s NERF zbraněmi</li>
        <li>Základy sebeobrany a bojových umění</li>
        <li>Crossfitové a silové výzvy</li>
        <li>Natáčení a střih parkourových videí na telefon (Instagram/TikTok/YouTube)</li>
        <li>Netradiční aktivity jako zipline (jízda po laně), lukostřelba nebo paddleboarding na vodě</li>
      </ul>

      <h3>3. Celotáborová hra a večerní program</h3>
      <p>Tábor není jen o fyzické dřině. Každý ročník má svou originální celotáborovou hru plnou šifer, týmové strategie a dobrodružství. Večery trávíme u táboráku, promítáním natočených videí z tréninků, diskotékou nebo noční hrou odvahy.</p>

      <h2>Bezpečnost a zdravotní dohled</h2>
      <p>Bezpečnost dětí je pro nás na prvním místě. Tréninky vedou certifikovaní trenéři, kteří dbají na správnou techniku a fyzickou připravenost dětí. Přímo v areálu máme po celou dobu přítomného kvalifikovaného zdravotníka, který dohlíží na pitný režim, únavu dětí a řeší případná drobná poranění či podávání léků.</p>

      <p>Pokud chcete svému dítěti dopřát léto plné zdravého pohybu a skvělé komunity, neváhejte. <a href="/tabor">Registrace na Leap Camp 2027</a> jsou již otevřené!</p>
    `
  }
];
