// Service page copy. Social Media Marketing = Stage 3 approved copy. The other four follow the same
// template and are DRAFTS written in Stage 4 (marked in the delivery report) — Emilian approves them.
import type { ServiceSlug } from '@/lib/site'

export type ServiceContent = {
  title: string // <title>
  description: string // meta description
  h1: [string, string, string] // before · underlined word · after
  intro: string
  ctaSub: string
  problems: string[]
  problemClose: string
  doTitle: string
  does: [string, string][]
  processTitle: string
  process: [string, string][]
  deliverables: string[]
  deliverablesNote: string
  faq: { q: string; a: string }[]
  finalTitle: string
  draft?: boolean
}

const call: [string, string] = ['Apelul gratuit.', 'Ne cunoaștem, aflăm ce vrei să obții și vedem dacă ne potrivim.']

export const serviceContent: Record<ServiceSlug, ServiceContent> = {
  'social-media-marketing': {
    title: 'Social media marketing București | Heart Social',
    description: 'Strategie, conținut filmat de noi, Reels și comunitate pentru afacerea ta. Rezervă-ți un apel gratuit și află ce poate face social media pentru tine.',
    h1: ['Social media care aduce ', 'clienți', ', nu doar like-uri.'],
    intro: 'Ne ocupăm cap-coadă de conturile afacerii tale: strategie, conținut filmat de noi, texte și comunitate. Tu te ocupi de clienți; noi, de felul în care ajung la tine.',
    ctaSub: 'Află ce poate face social media pentru afacerea ta.',
    problems: ['Postezi când ai timp. Adică rar.', 'Ai urmăritori, dar puțini scriu sau sună.', 'Nu știi ce să postezi mâine, darămite luna viitoare.', 'Ai încercat cu cineva „care se pricepe”, dar nu s-a schimbat nimic.'],
    problemClose: 'Nu e o problemă de efort. E o problemă de sistem. Exact asta construim.',
    doTitle: 'Tot ce ține de social media, într-un singur loc.',
    does: [
      ['Strategie.', 'Stabilim cui vorbești, ce spui și ce vrei să facă oamenii după ce văd postarea.'],
      ['Calendar de conținut.', 'Știi dinainte ce se postează și când.'],
      ['Conținut filmat de noi.', 'Fotografii și filmări de la ședințele noastre, Reels montate, grafice în stilul tău.'],
      ['Texte care vorbesc cu oamenii.', 'Descrieri, primele rânduri care opresc scroll-ul și îndemnuri clare la mesaj sau apel.'],
      ['Publicare și comunitate.', 'Postăm la timp și răspundem la comentarii [ȘI LA MESAJE? DE CONFIRMAT].'],
      ['Raport pe înțelesul tău.', 'Ce a mers, ce nu și ce schimbăm.'],
    ],
    processTitle: 'De la primul apel la prima postare, în 5 pași.',
    process: [
      call,
      ['Analiză și strategie.', 'Ne uităm la conturile tale și la concurență, apoi stabilim direcția.'],
      ['Ședința foto/video.', 'Venim la tine și filmăm materialul pentru primele săptămâni.'],
      ['Calendar și aprobare.', 'Primești postările înainte să apară. Nimic nu se publică fără acordul tău.'],
      ['Publicare și ajustare.', 'Postăm, urmărim ce funcționează și ajustăm de la o lună la alta.'],
    ],
    deliverables: ['[NR] postări', '[NR] Reels', '[NR] stories', '[NR] ședințe foto/video', 'un raport lunar'],
    deliverablesNote: 'Numărul exact îl stabilim împreună, în funcție de ce îți trebuie. Pe site nu publicăm prețuri, pentru că nu există două afaceri cu aceleași nevoi.',
    faq: [
      { q: 'Pe ce platforme lucrați?', a: 'Instagram, Facebook și TikTok [DE CONFIRMAT]. Alegem împreună unde sunt clienții tăi; nu trebuie să fii peste tot.' },
      { q: 'Cât costă?', a: 'Depinde de cât conținut îți trebuie și pe câte platforme. După apelul gratuit primești o ofertă clară, făcută pentru afacerea ta.' },
      { q: 'Cât de mult trebuie să mă implic?', a: 'Puțin: aprobi calendarul și ne spui noutățile (produse, oferte, evenimente). Restul e treaba noastră.' },
      { q: 'În cât timp văd rezultate?', a: 'Depinde de punctul de plecare și de obiectiv. În apelul gratuit îți spunem sincer ce e realist pentru afacerea ta.' },
      { q: 'Conturile rămân ale mele?', a: 'Da. Conturile și conținutul rămân ale tale [DE CONFIRMAT].' },
      { q: 'Lucrați doar în București?', a: 'Ședințele foto și video le facem în București [ȘI ÎN ALTE ZONE? DE CONFIRMAT]. Social media putem gestiona pentru afaceri din toată țara.' },
      { q: 'Pot să încep doar cu social media?', a: 'Da. Foto-video, Reels, site-ul sau reclamele le adăugăm când ai nevoie.' },
    ],
    finalTitle: 'Hai să vedem ce poate face Instagramul pentru afacerea ta.',
  },
  'sedinte-foto-video': {
    draft: true,
    title: 'Ședințe foto produse și video București | Heart Social',
    description: 'Fotografii de produs, echipă și locație, plus filmări pentru Reels și reclame. Rezervă-ți un apel gratuit cu Heart Social.',
    h1: ['Imagini care arată cine ești ', 'cu adevărat', '.'],
    intro: 'Fotografiem și filmăm produsele, oamenii și locul afacerii tale, ca tot ce postezi să arate ca tine. Venim noi la tine, în București.',
    ctaSub: 'Află ce fel de ședință ți se potrivește.',
    problems: ['Folosești poze de pe telefon sau din bănci de imagini.', 'Produsele arată mai bine în realitate decât online.', 'Nu ai material video pentru Reels sau reclame.'],
    problemClose: 'Oamenii cumpără cu ochii. Hai să le arătăm ce merită văzut.',
    doTitle: 'Ce fotografiem și filmăm',
    does: [
      ['Fotografii de produs.', 'Pe fundal curat sau în context, gata pentru site, magazin online și social media.'],
      ['Echipă și portrete.', 'Oamenii din spatele afacerii, surprinși natural.'],
      ['Locație și atmosferă.', 'Spațiul tău, așa cum îl simt clienții când intră pe ușă.'],
      ['Filmări pentru Reels și reclame.', 'Cadre verticale și orizontale, gândite de la început pentru montaj.'],
    ],
    processTitle: 'Cum decurge o ședință',
    process: [call, ['Planul ședinței.', 'Stabilim împreună ce fotografiem, unde și pentru ce canale.'], ['Ședința.', 'Venim la tine cu echipamentul și ne ocupăm de tot.'], ['Selecție și editare.', 'Alegem cadrele cele mai bune și le prelucrăm în stilul brandului tău.']],
    deliverables: ['[NR] fotografii editate', '[NR] clipuri video', 'formate pentru Instagram, TikTok și site'],
    deliverablesNote: 'Pachetul exact îl stabilim după apelul gratuit. Pe site nu publicăm prețuri.',
    faq: [
      { q: 'Unde se face ședința?', a: 'La tine: în magazin, salon, birou sau unde lucrezi. În București [ȘI ÎN ALTE ZONE? DE CONFIRMAT].' },
      { q: 'În cât timp primesc materialele?', a: '[TERMEN DE LIVRARE — DE CONFIRMAT]' },
      { q: 'Pot folosi fotografiile oriunde?', a: '[DREPTURI DE UTILIZARE — DE CONFIRMAT]' },
    ],
    finalTitle: 'Hai să facem imagini pe care chiar le vrei postate.',
  },
  'editare-reels': {
    draft: true,
    title: 'Editare Reels pentru afaceri | Heart Social',
    description: 'Montaj ritmat, subtitrări și sunet pentru Reels și TikTok care opresc scroll-ul. Rezervă-ți un apel gratuit.',
    h1: ['Reels care ', 'opresc', ' scroll-ul.'],
    intro: 'Transformăm filmările tale sau ale noastre în Reels ritmate, cu subtitrări și sunet, gândite pentru Instagram și TikTok.',
    ctaSub: 'Află cum pot arăta Reels-urile afacerii tale.',
    problems: ['Ai filmări în telefon, dar nu ai timp să le montezi.', 'Reels-urile tale se opresc la câteva vizualizări.', 'Nu știi ce să pui în primele secunde.'],
    problemClose: 'Un Reel bun nu e noroc. E montaj, ritm și o idee clară.',
    doTitle: 'Ce include montajul',
    does: [
      ['Început care oprește scroll-ul.', 'Primele secunde sunt construite ca oamenii să rămână.'],
      ['Montaj ritmat.', 'Tăieturi pe muzică, fără momente moarte.'],
      ['Subtitrări.', 'Pentru cei care se uită fără sunet.'],
      ['Formate corecte.', 'Vertical 9:16, cu zone sigure pentru Instagram și TikTok.'],
    ],
    processTitle: 'Cum lucrăm',
    process: [call, ['Materialul.', 'Ne trimiți filmările sau le filmăm noi la o ședință.'], ['Montaj.', 'Primești prima variantă a Reel-ului.'], ['Ajustări și livrare.', 'Facem modificările și îți dăm fișierul final.']],
    deliverables: ['[NR] Reels pe lună', 'subtitrări', 'coperți pentru Reels'],
    deliverablesNote: 'Numărul și ritmul le stabilim împreună. Pe site nu publicăm prețuri.',
    faq: [
      { q: 'Pot trimite filmări făcute cu telefonul?', a: 'Da. Telefoanele de azi filmează suficient de bine; îți spunem și cum să filmezi ca să iasă și mai bine.' },
      { q: 'Câte modificări pot cere?', a: '[NUMĂR DE REVIZII — DE CONFIRMAT]' },
      { q: 'Folosiți muzică populară?', a: '[REGULA PENTRU MUZICĂ ȘI DREPTURI — DE CONFIRMAT]' },
    ],
    finalTitle: 'Hai să facem Reels pe care oamenii le urmăresc până la capăt.',
  },
  'creare-site-web-design': {
    draft: true,
    title: 'Creare site București | Heart Social',
    description: 'Site-uri rapide, clare pe telefon și construite ca vizitatorii să te contacteze. Rezervă-ți un apel gratuit cu Heart Social.',
    h1: ['Un site care transformă vizitatorii în ', 'clienți', '.'],
    intro: 'Facem site-uri rapide, clare pe telefon și construite în jurul unui singur scop: să te contacteze cât mai mulți oameni potriviți.',
    ctaSub: 'Află ce fel de site îi trebuie afacerii tale.',
    problems: ['Site-ul tău e vechi, lent sau greu de folosit pe telefon.', 'Oamenii intră pe site, dar nu sună și nu scriu.', 'Nu ai site deloc și trimiți totul pe Instagram.'],
    problemClose: 'Un site nu e o carte de vizită. E cel mai muncitor angajat al tău.',
    doTitle: 'Ce include un site făcut de noi',
    does: [
      ['Structură gândită pentru clienți.', 'Fiecare pagină răspunde la o întrebare și duce spre un pas următor.'],
      ['Design în stilul brandului.', 'Arată ca tine, nu ca un șablon.'],
      ['Rapid și clar pe telefon.', 'Mulți dintre clienții tăi te caută de pe telefon.'],
      ['Optimizare pentru Google.', 'Titluri, descrieri și structură care ajută să fii găsit.'],
    ],
    processTitle: 'Cum construim site-ul',
    process: [call, ['Structură și texte.', 'Stabilim paginile și ce spune fiecare.'], ['Design.', 'Vezi cum arată înainte să fie construit.'], ['Construcție și lansare.', 'Îl construim, îl testăm și îl punem online.']],
    deliverables: ['site responsive', 'formular de contact', 'optimizare SEO de bază', '[MENTENANȚĂ — DE CONFIRMAT]'],
    deliverablesNote: 'Fiecare site e diferit, așa că oferta o primești după apelul gratuit.',
    faq: [
      { q: 'În cât timp e gata site-ul?', a: '[TERMEN — DE CONFIRMAT]' },
      { q: 'Pot modifica singur textele după lansare?', a: '[DE CONFIRMAT]' },
      { q: 'Vă ocupați și de domeniu și găzduire?', a: '[DE CONFIRMAT]' },
    ],
    finalTitle: 'Hai să-ți facem un site care chiar aduce clienți.',
  },
  'campanii-ads': {
    draft: true,
    title: 'Reclame Facebook și TikTok București | Heart Social',
    description: 'Campanii Meta și TikTok care aduc oameni, nu doar afișări. Află într-un apel gratuit cum îți putem crește business-ul.',
    h1: ['Reclame care aduc ', 'oameni', ', nu doar afișări.'],
    intro: 'Facem campanii pe Meta (Facebook și Instagram) și TikTok [GOOGLE: DE CONFIRMAT], cu bugetul pus acolo unde aduce rezultate.',
    ctaSub: 'Află cum ar arăta o campanie pentru afacerea ta.',
    problems: ['Ai dat „Promovează” la câteva postări, fără rezultat.', 'Nu știi dacă banii pe reclame se întorc.', 'Ai multe afișări, dar puține mesaje sau comenzi.'],
    problemClose: 'Reclamele bune încep cu un obiectiv clar, nu cu un buton.',
    doTitle: 'Ce facem pentru campaniile tale',
    does: [
      ['Obiectiv și public.', 'Stabilim ce vrei să obții și pe cine vrei să atingi.'],
      ['Reclame create de noi.', 'Texte, imagini și video gândite pentru fiecare platformă.'],
      ['Urmărire corectă.', 'Măsurăm mesajele, apelurile și comenzile, nu doar click-urile.'],
      ['Optimizare continuă.', 'Mutăm bugetul spre ce funcționează.'],
    ],
    processTitle: 'Cum pornim o campanie',
    process: [call, ['Plan.', 'Obiectiv, public, buget și mesaje.'], ['Lansare.', 'Pornim campaniile și verificăm măsurarea.'], ['Optimizare și raport.', 'Ajustăm și îți arătăm clar ce a adus campania.']],
    deliverables: ['plan de campanie', 'reclamele (text, imagine, video)', 'raport lunar'],
    deliverablesNote: 'Bugetul de reclame îl stabilim împreună. Pe site nu publicăm prețuri.',
    faq: [
      { q: 'Pe ce platforme faceți reclame?', a: 'Meta (Facebook și Instagram) și TikTok. Google Ads [DE CONFIRMAT].' },
      { q: 'Cât buget îmi trebuie?', a: 'Depinde de obiectiv și de piață. În apelul gratuit îți spunem sincer ce are sens pentru tine.' },
      { q: 'Contul de reclame rămâne al meu?', a: '[DE CONFIRMAT]' },
    ],
    finalTitle: 'Hai să facem reclame care aduc oameni reali.',
  },
}
