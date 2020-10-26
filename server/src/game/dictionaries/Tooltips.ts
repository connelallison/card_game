const Tooltips = {
    option: {
        name: { english: 'Option' },
        text: { templates: { english: `Choose something that happens when you play this from your hand.` } },
    },
    action: {
        name: { english: 'Action' },
        text: { templates: { english: `Something that happens when you play this from your hand.` } },
    },
    event: {
        name: { english: 'Event' },
        text: { templates: { english: `Something that happens when this enters play.` } },
    },
    deathEvent: {
        name: { english: 'Death Event' },
        text: { templates: { english: `Something that happens when this is destroyed.` } },
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
    snipe: {
        name: { english: 'Snipe' },
        text: { templates: { english: `When this attacks, it deals damage before taking damage.` } }
    },
    rush: {
        name: { english: 'Rush' },
        text: { templates: { english: `Can attack followers immediately.` } },
    },
    mob: {
        name: { english: 'Mob' },
        text: { templates: { english: `Can attack immediately. Can only ever attack leaders if they have no followers.` } },
    },
    fortune: {
        name: { english: 'Fortune' },
        text: { templates: { english: `The first time this takes damage, ignore it.` } },
    },
    bloodthirst: {
        name: { english: 'Bloodthirst' },
        text: { templates: { english: `After this attacks and kills the defender, it can attack again.` } },
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
    collateral: {
        name: { english: 'Collateral' },
        text: { templates: { english: `When this card does single-target damage to a follower, it also hits adjacents.` } },
    },
    rot: {
        name: { english: 'Rot' },
        text: { templates: { english: `This card's damage is Rot damage.` } },
    },
    rotDamage: {
        name: { english: 'Rot damage' },
        text: { templates: { english: `Rot damage reduces max Health, and ignores Fortune and Immune.` } },
    },
    nourishHealing: {
        name: { english: 'Nourish healing' },
        text: { templates: { english: `Nourish healing increases max Health.` } },
    },
    starter: {
        name: { english: 'Starter' },
        text: { templates: { english: `You can start the game with this leader in play.` } },
    },
    repeatable: {
        name: { english: 'Repeatable' },
        text: { templates: { english: `You can use this technique more than once per turn.` } },
    },
    immune: {
        name: { english: 'Immune' },
        text: { templates: { english: `This ignores damage (except Rot damage) and destroy effects.` } },
    },
    lethal: {
        name: { english: 'Lethal' },
        text: { templates: { english: `If this damages a follower, destroy it.` } },
    },
    barbarian: {
        name: { english: 'Barbarian: ⚔' },
        text: { templates: { english: `A member of the Barbarian follower category.` } },
    },
    legend: {
        name: { english: 'Legend: 🕮' },
        text: { templates: { english: `A member of the Legend follower category.` } },
    },
    noble: {
        name: { english: 'Noble: ⚜' },
        text: { templates: { english: `A member of the Noble follower category.` } },
    },
    tech: {
        name: { english: 'Tech: ⚙' },
        text: { templates: { english: `A member of the Tech follower category.` } },
    },
    underclass: {
        name: { english: 'Underclass: ⛓' },
        text: { templates: { english: `A member of the Underclass follower category.` } },
    },
    woman: {
        name: { english: 'Woman: ♀' },
        text: { templates: { english: `A member of the Woman follower category.` } },
    },
}

export default Tooltips