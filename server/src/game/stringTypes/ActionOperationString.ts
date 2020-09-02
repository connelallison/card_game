// type ActionOperationString = 'damage' 
//                             | 'heal' 
//                             | 'draw' 
//                             | 'buffCharacterAttack' 
//                             | 'buffCharacterHealth' 
//                             | 'buffCharacterAttackAndHealth' 
//                             | 'summonCard' 
//                             | 'putIntoPlay'
//                             | 'markDestroyed'
//                             | 'forceDeathPhase'
//                             | 'storeValue'

import ActionOperations from "../dictionaries/ActionOperations"

type ActionOperationString = keyof typeof ActionOperations

export default ActionOperationString