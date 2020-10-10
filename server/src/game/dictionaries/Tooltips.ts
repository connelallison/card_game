const Tooltips = {
    option: {
        name: { english: 'Option' },
        text: { templates: { english: `Choose one of multiple Actions when you play this from your hand.` } },
    },
    action: {
        name: { english: 'Action' },
        text: { templates: { english: `Does something when you play this from your hand.` } },
    },
    event: {
        name: { english: 'Event' },
        text: { templates: { english: `Does something when this enters play.` } },
    },
    deathEvent: {
        name: { english: 'Death Event' },
        text: { templates : { english: `Does something when this is destroyed.` } },
    },
    eureka: {
        name: { english: 'Eureka' },
        text: { templates: { english: `An Action that only activates when played as the first or last card in your hand.` } },
    },
    guard: {
        name: { english: 'Guard' },
        text: { templates: { english: `Friendly characters without Guard can't be attacked.` } },
    },
    pillage: {
        name: { english: 'Pillage' },
        text: { templates: { english: `Damage done by this also heals your leader.` } },
    },
    rush: {
        name: { english: 'Rush' },
        text: { templates: { english: `Can attack followers immediately.` } },
    },
    mob: {
        name: { english: 'Mob' },
        text: { templates: { english: `Can attack immediately. Can only ever attack leaders if they have no followers.` } },
    },
    fervour: {
        name: { english: 'Fervour' },
        text: { templates: { english: `Increases the effect of Actions, and the Attack of cards with Passionate.` } },
    },
    passionate: {
        name: { english: 'Passionate' },
        text: { templates: { english: `Has +Attack equal to your Fervour.` } },
    },
    money: { 
        name: { english: 'Money' },
        text: { templates: { english: `The resource you spend to play cards.` } }
    },
    income: {
        name: { english: 'Income' },
        text: { templates: { english: `The amount your Money refills to at the end of your turn.` } },
    },
    growth: {
        name: { english: 'Growth' },
        text: { templates: { english: `The amount your Income increases by at the end of your turn.` } },
    },
    rent: {
        name: { english: 'Rent' },
        text: { templates: { english: `You pay this amount at the end of your turn, each turn this is in play.` } },
    },
    debt: {
        name: { english: 'Debt' },
        text: { templates: { english: `You pay this amount at the end of your turn, the first turn you play this.` } },
    },
}

export default Tooltips