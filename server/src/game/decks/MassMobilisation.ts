const MassMobilisation: DeckObject = {
  id: 'MassMobilisation',
  name: 'Mass Mobilisation',
  class: 'The People',
  leader: 'NapoleonBonaparte',
  passive: 'GrandeArmee',
  cards: [
    'TwelveTables',
    'TwelveTables',
    'VladimirLenin',
    'VladimirLenin',
    'JamesMadison',
    'JamesMadison',
    'FrenchRevolution',
    'FrenchRevolution',
    'StatueOfLiberty',
    'StatueOfLiberty',
    'Collectivisation',
    'Collectivisation',
    'TupacShakur',
    'TupacShakur',
    'StormingOfTheBastille',
    'StormingOfTheBastille',
    'Robespierre',
    'Robespierre',
    'SaintJust',
    'SaintJust',
    'Cleon',
    'Cleon',
    // 'SubprimeBorrower',
    // 'SubprimeBorrower',
    'TankMan',
    'TankMan',
    'HelenOfTroy',
    'HelenOfTroy',
    // 'M1Abrams',
    // 'M1Abrams',
    'SamuelColt',
    'SamuelColt',
    'BostonTeaParty',
    'BostonTeaParty',
  ],
  description: `Overwhelm your opponent with numbers and revolutionary fervour using this Citizen-focused deck. `,
  tips: `- Make frequent use of your leader technique. This deck is most effective when your followers outnumber your opponent's.
         - The Statue of Liberty is very powerful. Produce lots of Citizens to make sure it's not destroyed.
         - Collectivisation combines very well with aura buffs like the Statue of Liberty or the Second Amendment.
         - Saint-Just and the French Revolution pair well.`
}

export default MassMobilisation

import DeckObject from '../structs/DeckObject'