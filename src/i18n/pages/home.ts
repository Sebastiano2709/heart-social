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
    lead: 'Rareori e vorba de efort. De cele mai multe ori lipsește legătura dintre ce postezi și ce vrei să vinzi. Noi construim legătura asta de la cap la coadă: strategie, ședințe foto și video, Reels, site și reclame. Totul la noi, făcut din inimă și cu ochii pe rezultate.',
  },
  call: {
    eyebrow: 'Apel gratuit, fără obligații',
    title: 'Un singur apel și vezi clar ce merge și ce nu.',
    steps: [
      ['Te ascultăm.', 'Ne spui ce vinzi, cui și ce ai încercat până acum. Fără formulare lungi și fără jargon.'],
      ['Ne uităm împreună.', 'Trecem prin Instagramul, site-ul sau reclamele tale și îți arătăm unde se pierd atenția și clienții.'],
      ['Pleci cu un plan.', 'Primești câteva idei pe care le poți pune în practică imediat, cu noi sau fără noi.'],
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
    lead: 'Multe agenții îți vând ori postări, ori reclame, ori un site, iar la final ai bucăți care nu se leagă între ele. La Heart Social, strategia, filmarea, montajul, site-ul și campaniile pornesc de la același plan și urmăresc același lucru: mai mulți clienți pentru tine.',
    pillars: [
      ['Implicare reală', 'Ne pasă de afacerea ta ca de a noastră. De aici ne vine și numele.'],
      ['Conținut filmat de noi', 'Ședințele foto și video le facem noi, așa că ce postezi arată ca tine, nu ca o bancă de imagini.'],
      ['Strategie + execuție', 'Nu ne oprim la sfaturi. Ne apucăm noi de treabă, de la idee la postare.'],
      ['Raportare transparentă', 'Vezi clar ce a mers, ce nu și ce schimbăm, pe înțelesul tău.'],
      ['Parteneriat pe termen lung', 'Construim împreună, lună de lună, nu proiect cu proiect.'],
    ] as [string, string][],
    cta: 'Hai să vorbim',
  },
  services: { eyebrow: 'Ce facem', title: 'Tot ce îi trebuie afacerii tale ca să fie văzută. Și aleasă.', note: 'Nu știi de unde să începi? Exact asta lămurim la telefon.' },
  audiences: {
    eyebrow: 'Cu cine lucrăm',
    title: 'Fie că ai o afacere locală, o firmă B2B sau lucrezi pe cont propriu, pornim de la ce îți trebuie ție.',
    lead: 'Clienții noștri nu seamănă între ei, dar toți vor același lucru: să fie găsiți și aleși.',
    for: 'Pentru',
    groups: [
      {
        name: 'afaceri locale',
        items: [
          ['Mai mulți clienți din zonă', 'Cafenele, saloane, restaurante: te găsesc oamenii care stau sau lucrează la câțiva pași de tine.'],
          ['Conținut care arată locul', 'Filmăm atmosfera, oamenii și produsele, ca lumea să știe ce o așteaptă încă dinainte să intre.'],
          ['Mesaje, rezervări, telefoane', 'Totul e gândit ca urmăritorii să ajungă clienți.'],
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
          ['Un brand personal în care oamenii au încredere', 'Antrenori, consultanți, creatori: oamenii aleg oameni.'],
          ['Postări constante, fără stres', 'Tu îți vezi de treabă; noi ne ocupăm de conținut și de calendar.'],
          ['O imagine profesionistă, dar tot a ta', 'Fotografii și Reels în care te recunoști.'],
        ] as [string, string][],
      },
    ],
    cta: 'Vezi ce putem face pentru tine',
  },
  founder: {
    eyebrow: 'Cine e în spatele Heart Social',
    title: 'Salut, sunt Emilian.',
    lead: (year: number) => `Am absolvit Publicitatea la FSPAC, Universitatea Babeș-Bolyai din Cluj-Napoca, în ${year}. Am pornit Heart Social ca să ajut afacerile mici să fie văzute și alese.`,
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
    lead: 'It’s rarely a question of effort. More often, nothing connects what you post with what you’re trying to sell. We build that connection from start to finish: strategy, photo and video shoots, Reels, your website and ads. All in one place, made with care and with an eye on results.',
  },
  call: {
    eyebrow: 'Free call, no strings attached',
    title: 'One call, and you’ll see clearly what’s working and what isn’t.',
    steps: [
      ['We listen.', 'You tell us what you sell, who you sell to and what you’ve tried so far. No long forms, no jargon.'],
      ['We look at it together.', 'We go through your Instagram, website or ads and show you where attention and customers slip away.'],
      ['You leave with a plan.', 'You get a few ideas you can put into practice straight away, with or without us.'],
    ],
    cta: 'I want the free call',
  },
  stats: {
    aria: 'Heart Social in numbers',
    items: ['services under one roof', 'types of clients: local businesses, B2B companies and freelancers', 'partner, from strategy to post'],
    portfolio: 'See the portfolio',
  },
  meet: {
    eyebrow: 'Meet Heart Social',
    title: 'A young agency that treats your business like its own.',
    lead: 'Many agencies sell you posts, or ads, or a website, and you end up with pieces that don’t fit together. At Heart Social, the strategy, the shoot, the edit, the website and the campaigns all start from the same plan and work towards the same goal: more customers for you.',
    pillars: [
      ['Real commitment', 'We care about your business as if it were ours. That’s where our name comes from.'],
      ['Content we shoot ourselves', 'We do the photo and video shoots ourselves, so what you post looks like you, not like stock photos.'],
      ['Strategy + execution', 'We don’t stop at advice. We roll up our sleeves and do the work, from idea to post.'],
      ['Honest reporting', 'See clearly what worked, what didn’t and what we’re changing, in plain English.'],
      ['A long-term partnership', 'We build together, month after month, not one project at a time.'],
    ],
    cta: 'Let’s talk',
  },
  services: { eyebrow: 'What we do', title: 'Everything your business needs to be seen. And chosen.', note: 'Not sure where to start? That’s exactly what we sort out on the call.' },
  audiences: {
    eyebrow: 'Who we work with',
    title: 'Whether you run a local business or a B2B company, or work for yourself, we start with what you need.',
    lead: 'Our clients don’t have much in common, except that they all want to be found and chosen.',
    for: 'For',
    groups: [
      {
        name: 'local businesses',
        items: [
          ['More customers nearby', 'Cafés, salons, restaurants: people who live and work nearby find you.'],
          ['Content that shows your place', 'We film the atmosphere, the people and the products, so customers know what to expect before they walk in.'],
          ['Messages, bookings, calls', 'Everything is built to turn followers into customers.'],
        ],
      },
      {
        name: 'B2B companies',
        items: [
          ['Credibility with partners', 'An online presence as serious as your company.'],
          ['Clear messages for complex services', 'We explain what you do in terms the decision-maker understands.'],
          ['One partner', 'Your website, photo and video, and campaigns, all run by the same team.'],
        ],
      },
      {
        name: 'independent professionals',
        items: [
          ['A personal brand people trust', 'Coaches, consultants, creators: people choose people.'],
          ['Regular posts, without the stress', 'You get on with your work; we take care of the content and the calendar.'],
          ['A professional image that still feels like you', 'Photos and Reels that actually look like you.'],
        ],
      },
    ],
    cta: 'See what we can do for you',
  },
  founder: {
    eyebrow: 'The person behind Heart Social',
    title: 'Hi, I’m Emilian.',
    lead: (year: number) => `I graduated in Advertising from FSPAC, Babeș-Bolyai University in Cluj-Napoca, in ${year}. I started Heart Social to help small businesses get seen and chosen.`,
    quote: '“If I can’t put my heart into a project, I don’t take it on.”',
    story: 'Read my story',
    photoAlt: 'Emilian Horea, founder of Heart Social, wearing the violet sash of an FSPAC Advertising graduate',
    instagramAria: 'on Instagram',
  },
  work: { eyebrow: 'Recent work', title: 'We’d rather show you.', text: 'You’ll find our latest Reels, photos and campaigns on Instagram.', link: 'See more on Instagram' },
}

export const homeCopy: Record<Locale, HomeCopy> = { ro, en }
