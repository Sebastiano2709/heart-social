// Home page copy. `ro` is the approved Stage 3 copy; `en` is its English adaptation (same structure).
import type { Locale } from '../config'

const ro = {
  meta: {
    title: 'Agenție social media București | Heart Social',
    description: 'Social media, ședințe foto/video, Reels, site-uri și reclame pentru afaceri din București. Rezervă-ți un apel gratuit cu Heart Social.',
  },
  hero: {
    eyebrow: 'Agenție de promovare online · București',
    h1: ['Postezi constant. Dar ', 'clienții', ' tot nu sună?'] as [string, string, string],
    lead: 'Rareori e vina efortului tău. De obicei lipsește legătura dintre ce postezi și ce vrei să vinzi. Noi o construim cap-coadă: strategie, ședințe foto și video, Reels, site și reclame, făcute sub același acoperiș, din inimă și cu ochii pe rezultate.',
  },
  call: {
    eyebrow: 'Apel gratuit, fără obligații',
    title: 'Un apel. O imagine clară despre ce merge și ce nu.',
    steps: [
      ['Te ascultăm.', 'Ne spui ce vinzi, cui și ce ai încercat până acum. Fără formulare lungi și fără jargon.'],
      ['Ne uităm împreună.', 'Trecem prin Instagramul, site-ul sau reclamele tale și îți arătăm unde se pierd atenția și clienții.'],
      ['Pleci cu pașii următori.', 'Primești câteva idei pe care le poți aplica imediat, cu noi sau fără noi.'],
    ] as [string, string][],
    cta: 'Vreau apelul gratuit',
  },
  stats: {
    aria: 'Heart Social în cifre',
    items: ['servicii sub un singur acoperiș', 'tipuri de clienți: afaceri locale, B2B și independenți', 'singur partener, de la strategie la postare'],
    portfolio: 'Vezi portofoliul',
  },
  meet: {
    eyebrow: 'Cunoaște Heart Social',
    title: 'O agenție tânără, care se implică de parcă ar fi afacerea ei.',
    lead: 'Multe agenții îți vând ori postări, ori reclame, ori un site. Rezultatul: bucăți care nu se leagă. La Heart Social, strategia, filmarea, montajul, site-ul și campaniile pleacă din același plan și duc spre același scop: mai mulți clienți pentru tine.',
    pillars: [
      ['Implicare reală', 'Ne pasă de afacerea ta ca de a noastră. De aici ne vine și numele.'],
      ['Conținut filmat de noi', 'Ședințele foto și video le facem noi, așa că ce postezi arată ca tine, nu ca o bancă de imagini.'],
      ['Strategie + execuție', 'Nu doar îți spunem ce să faci. Facem noi, de la idee la postare.'],
      ['Raportare transparentă', 'Vezi clar ce a mers, ce nu și ce schimbăm, pe limba ta.'],
      ['Parteneriat pe termen lung', 'Construim împreună, lună de lună, nu proiect cu proiect.'],
    ] as [string, string][],
    cta: 'Hai să vorbim',
  },
  services: { eyebrow: 'Ce facem', title: 'Tot ce îi trebuie afacerii tale ca să fie văzută. Și aleasă.', note: 'Nu știi de unde să începi? Exact asta lămurim la telefon.' },
  audiences: {
    eyebrow: 'Cu cine lucrăm',
    title: 'Afacere locală, firmă B2B sau pe cont propriu: pornim de la ce ai nevoie tu.',
    lead: 'Clienții noștri sunt foarte diferiți. Au însă un lucru în comun: vor să fie găsiți, recunoscuți și aleși.',
    for: 'Pentru',
    groups: [
      {
        name: 'afaceri locale',
        items: [
          ['Mai mulți clienți din zonă', 'Cafenele, saloane, restaurante: te găsesc oamenii care sunt la câțiva pași de tine.'],
          ['Conținut care arată locul', 'Filmăm atmosfera, oamenii și produsele, ca lumea să vină cu încredere de la prima vizită.'],
          ['Mesaje, rezervări, telefoane', 'Totul e gândit ca urmăritorii să devină clienți.'],
        ] as [string, string][],
      },
      {
        name: 'companii B2B',
        items: [
          ['Credibilitate în fața partenerilor', 'O prezență online la fel de serioasă ca firma ta.'],
          ['Mesaje clare pentru servicii complicate', 'Explicăm ce faci pe înțelesul celui care decide.'],
          ['Un singur partener', 'Site, foto-video și campanii, coordonate de aceeași echipă.'],
        ] as [string, string][],
      },
      {
        name: 'profesioniști independenți',
        items: [
          ['Un brand personal care inspiră încredere', 'Antrenori, consultanți, creatori: oamenii aleg oameni.'],
          ['Consecvență fără stres', 'Tu îți faci treaba; noi ne ocupăm de conținut și de calendar.'],
          ['O imagine profesionistă, dar autentică', 'Fotografii și Reels în care te recunoști.'],
        ] as [string, string][],
      },
    ],
    cta: 'Vezi ce putem face pentru tine',
  },
  founder: {
    eyebrow: 'Cine e în spatele Heart Social',
    title: 'Salut, sunt Emilian.',
    lead: (year: number) => `Am absolvit Publicitatea la FSPAC, Universitatea Babeș-Bolyai din Cluj-Napoca, în ${year}. Am pornit Heart Social ca să ajut afacerile mici să fie văzute, recunoscute și alese.`,
    quote: '„Dacă nu mă pot implica din inimă într-un proiect, nu îl iau.”',
    story: 'Află povestea mea',
    photoAlt: 'Emilian Horea, fondatorul Heart Social, cu eșarfa violet de absolvent Publicitate FSPAC',
    instagramAria: 'pe Instagram',
  },
  work: { eyebrow: 'Lucrări recente', title: 'Mai bine îți arătăm.', text: 'Cele mai noi Reels, fotografii și campanii le găsești pe Instagram.', link: 'Vezi mai multe pe Instagram' },
}

export type HomeCopy = typeof ro

const en: HomeCopy = {
  meta: {
    title: 'Social media agency in Bucharest | Heart Social',
    description: 'Social media, photo and video shoots, Reels, websites and ads for businesses in Bucharest. Book a free call with Heart Social.',
  },
  hero: {
    eyebrow: 'Online marketing agency · Bucharest',
    h1: ['You post all the time. So why aren’t ', 'customers', ' calling?'],
    lead: 'It’s rarely about how hard you work. Usually, what’s missing is the link between what you post and what you want to sell. We build that link end to end: strategy, photo and video shoots, Reels, your website and ads, all under one roof, done with heart and an eye on results.',
  },
  call: {
    eyebrow: 'Free call, no strings attached',
    title: 'One call. A clear picture of what’s working and what isn’t.',
    steps: [
      ['We listen.', 'You tell us what you sell, who you sell to and what you’ve tried so far. No long forms, no jargon.'],
      ['We look at it together.', 'We go through your Instagram, website or ads and show you where attention and customers slip away.'],
      ['You leave with next steps.', 'You get a few ideas you can put into practice straight away, with us or without us.'],
    ],
    cta: 'I want the free call',
  },
  stats: {
    aria: 'Heart Social in numbers',
    items: ['services under one roof', 'types of clients: local businesses, B2B and independents', 'single partner, from strategy to posting'],
    portfolio: 'See the portfolio',
  },
  meet: {
    eyebrow: 'Meet Heart Social',
    title: 'A young agency that treats your business like its own.',
    lead: 'Lots of agencies sell you posts, or ads, or a website. What you end up with is pieces that don’t fit together. At Heart Social, the strategy, the shoot, the edit, the website and the campaigns all start from the same plan and lead to the same goal: more customers for you.',
    pillars: [
      ['Real commitment', 'We care about your business as if it were ours. That’s where our name comes from.'],
      ['Content we shoot ourselves', 'We do the photo and video shoots ourselves, so what you post looks like you, not like a stock photo library.'],
      ['Strategy + execution', 'We don’t just tell you what to do. We do it, from the idea to the post.'],
      ['Transparent reporting', 'See clearly what worked, what didn’t and what we’re changing, in plain language.'],
      ['A long-term partnership', 'We build things together, month after month, not one project at a time.'],
    ],
    cta: 'Let’s talk',
  },
  services: { eyebrow: 'What we do', title: 'Everything your business needs to be seen. And chosen.', note: 'Not sure where to start? That’s exactly what we sort out on the call.' },
  audiences: {
    eyebrow: 'Who we work with',
    title: 'Local business, B2B company or self-employed: we start from what you need.',
    lead: 'Our clients are very different. But they have one thing in common: they want to be found, recognised and chosen.',
    for: 'For',
    groups: [
      {
        name: 'local businesses',
        items: [
          ['More customers nearby', 'Cafés, salons, restaurants: people a few steps away from you find you.'],
          ['Content that shows your place', 'We film the atmosphere, the people and the products, so customers walk in with confidence on their first visit.'],
          ['Messages, bookings, calls', 'Everything is designed to turn followers into customers.'],
        ],
      },
      {
        name: 'B2B companies',
        items: [
          ['Credibility with partners', 'An online presence as serious as your company.'],
          ['Clear messages for complex services', 'We explain what you do in terms the decision-maker understands.'],
          ['One single partner', 'Website, photo and video, and campaigns, coordinated by the same team.'],
        ],
      },
      {
        name: 'independent professionals',
        items: [
          ['A personal brand people trust', 'Coaches, consultants, creators: people choose people.'],
          ['Consistency without the stress', 'You do your job; we take care of the content and the calendar.'],
          ['A professional but authentic image', 'Photos and Reels you recognise yourself in.'],
        ],
      },
    ],
    cta: 'See what we can do for you',
  },
  founder: {
    eyebrow: 'The person behind Heart Social',
    title: 'Hi, I’m Emilian.',
    lead: (year: number) => `I graduated in Advertising from FSPAC, Babeș-Bolyai University in Cluj-Napoca, in ${year}. I started Heart Social to help small businesses get seen, recognised and chosen.`,
    quote: '“If I can’t put my heart into a project, I don’t take it on.”',
    story: 'Read my story',
    photoAlt: 'Emilian Horea, founder of Heart Social, wearing the violet sash of an FSPAC Advertising graduate',
    instagramAria: 'on Instagram',
  },
  work: { eyebrow: 'Recent work', title: 'Better to show you.', text: 'You’ll find our latest Reels, photos and campaigns on Instagram.', link: 'See more on Instagram' },
}

export const homeCopy: Record<Locale, HomeCopy> = { ro, en }
