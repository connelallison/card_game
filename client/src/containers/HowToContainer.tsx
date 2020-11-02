import React, { Component } from 'react'
import { BigCard } from '../components/HoverCard'
import PlayerStatus from '../components/PlayerStatus'
import { Cards } from '../structs/DeckObject'
import { dummyAnimations, dummySelections } from '../structs/Dummies'
// import Highlighter from 'react-highlight-words'


class HowToContainer extends Component {
    props!: { offscreen?: boolean, cards: Cards }
    state: { section: string, subsection: string }

    constructor(props: { offscreen?: boolean, cards: Cards }) {
        super(props)
        this.state = {
            section: 'Basics',
            subsection: 'Introduction',
        }
    }

    // boldedText(text) {
    //     return <Highlighter
    //         className='boldedText'
    //         caseSensitive
    //         highlightClassName='keyword'
    //         searchWords={['Guard', 'Fortune', 'Fervour', 'Rent', 'Passionate',
    //             'Snipe', 'Pillage', 'Action', 'Event', 'Option',
    //             'Eureka', 'Income', 'Growth', 'Bloodthirst', 'Mob',
    //             'Rush', 'Death', 'Legacy', 'Hand', 'Deck',
    //             'Starter', 'Passive', 'Successor', 'Immune', 'Rot',
    //             'Nourish', 'Collateral', 'Debt', 'Lethal']}
    //         highlightTag='span'
    //         textToHighlight={text}
    //     />
    // }

    render() {
        if (!this.props.cards) return null
        const HowToContent = {
            'Basics': {
                'Introduction': (
                    <>
                        <p>In the <em>History of Everything</em>, you will face your opponent in a 1v1 match using a varied deck of cards representing historical objects and characters. The goal is to defeat your opponent by reducing their Health to 0, by any means.</p>
                        <h3>Combat</h3>
                        <p>All characters (leaders and followers) have an Attack stat and a Health stat, and can attack once per turn. The Attack stat represents how much damage they will do with each attack, and the Health stat represents how much damage they can take before they die and are removed from play. The game ends when a player’s leader dies.</p>
                        <h3>Turns</h3>
                        <p>The game is turn-based. Each player draws a card from their deck at the start of their turn, and is then free to play cards from their hand, or attack with characters they have already put into play, until they have done everything they want to do during their turn (or until they run out of time). When you are ready to end your turn, press the “End turn” button at the top right of the screen. Don’t confuse it with the “Concede” button!</p>
                        <h3>Money</h3>
                        <p>Every card costs a certain amount of Money to play, depending on how powerful it is. Once you have spent all your Money, you will not be able to play any more cards. Your Money will replenish at the end of your turn, and each turn you will have more Money to spend than the last – this will mean that you can afford to play increasingly powerful cards as the game progresses and builds towards a climax. It is important to have a good balance of cheap and powerful cards in your deck, so that you have some to play near the beginning of the game and some stronger ones to play later.</p>
                        <h3>Classes</h3>
                        <p>There are eight different classes in the game, each with its own collection of exclusive cards that can only be used by that class. There is also a collection of neutral cards, which can be used by any class.</p>
                        <h3>Decks</h3>
                        <p>Every deck contains a starter leader, an ethos, and 30 cards. You can include a maximum of two copies of each card in your deck. A deck must also belong to a specific class, and can only contain cards from that class or from the neutral set.</p>
                    </>
                ),
                'Making a Move': (
                    <>
                        <p>During your turn, you will be able to select cards to play or attack with, as well as targets for their attacks and actions. To select a card, click on it. To unselect it, just click it again. Whenever you are required to choose a target, there will be a tooltip by your mouse cursor, explaining your current target selection - read it if you are unsure what to do.</p>
                        <h3>Highlighting</h3>
                        <p>When you are able to make a move, you will see some cards highlighted in different colours, indicating what you can do with them, like these:</p>
                        <div className='big cardList'>
                            <BigCard key='howTo:Tractor' object={this.props.cards.Tractor} animations={dummyAnimations} selections={dummySelections} forceHighlight='nonHostileTarget' />
                            <BigCard key='howTo:WuZetian' object={this.props.cards.WuZetian} animations={dummyAnimations} selections={dummySelections} forceHighlight='hostileTarget' />
                            <BigCard key='howTo:TupacShakur' object={this.props.cards.TupacShakur} animations={dummyAnimations} selections={dummySelections} forceHighlight='isSelected' />
                            <BigCard key='howTo:Archimedes' object={this.props.cards.Archimedes} animations={dummyAnimations} selections={dummySelections} forceHighlight='highlightedTarget' />
                        </div>
                        <ul>
                            <li>If a card is highlighted green, it means you can play it or order it to attack, or that you can target it with a friendly action.</li>
                            <li>If a card is highlighted red, it means that it is a valid target for an attack or hostile action.</li>
                            <li>If a card is highlighted blue, it means you have selected it for your next move.</li>
                            <li>If a card is highlighted orange, it means that it has a conditional action, which is currently active.</li>
                        </ul>
                        <h3>Tooltips</h3>
                        <p>If you are in a match and are unsure what something on a card means, hover over it for a moment. You will see explanations of keywords, a list of any extra effects that have been added to the card, and in some cases a related card (such as a leader’s leader technique).</p>
                    </>
                ),
                'Anatomy of a Card': (
                    <>
                        <p>Each card displays several important pieces of information. For example, here is the Helot card:</p>
                        <div className='big cardList'>
                            <BigCard key='howTo:Helot' object={this.props.cards.Helot} animations={dummyAnimations} selections={dummySelections} />
                        </div>
                        <ul>
                            <li>Its name is at the top.</li>
                            <li>Its background is a medium grey colour - this means it is part of the neutral set that can be used by every class. Each class has its own colour: a Learning class card would be blue, for example.</li>
                            <li>The green icon at the top left is its cost: it costs 1 Money. If the card is discounted from its base cost, this number will be green - if it has been made more expensive, the number will be red.</li>
                            <li>The brown icon at the top right shows that it has 3 charges.</li>
                            <li>Between the cost and charge icons is its sub-type: Helot is a nameless follower.</li>
                            <li>Beneath that is its card text, which describes its unique effects and properties.</li>
                            <li>The blue icon at the bottom left shows that it has 2 Attack. If the card’s Attack has been increased, the number will be green.</li>
                            <li>The red icon at the bottom right shows that it has 1 Health. If the card is damaged, the number will be red. If the card is undamaged, and its Health has been increased, the number will be green.</li>
                            <li>The little chains between its Attack and Health show that it is a member of the Underclass follower category. If you are unsure which follower category an icon represents, hover over the card and an explanation will appear on the left.</li>
                        </ul>
                        <p>Not all of these pieces of information will appear on every card, and they may sometimes be in slightly different locations – but as long as you know what the colours mean you should be fine.</p>
                    </>
                ),
                'Actions vs Events': (
                    <>
                        <p>Some cards will do something special when you play them. This can be an Action, an Option, a Eureka, or an Event. Here is an example of each:</p>
                        <div className='big cardList'>
                            <BigCard key='howTo:SaintJust' object={this.props.cards.SaintJust} animations={dummyAnimations} selections={dummySelections} />
                            <BigCard key='howTo:Banker' object={this.props.cards.Banker} animations={dummyAnimations} selections={dummySelections} />
                            <BigCard key='howTo:JohannesGutenberg' object={this.props.cards.JohannesGutenberg} animations={dummyAnimations} selections={dummySelections} />
                            <BigCard key='howTo:BattleOfSuiyang' object={this.props.cards.BattleOfSuiyang} animations={dummyAnimations} selections={dummySelections} />
                        </div>
                        <ul>
                            <li>An Action is something a card does when you play it from your hand. In some cases, an Action will require you to choose a target (or, rarely, multiple targets). If the card enters play by other means, the Action won’t activate.</li>
                            <li>An Option is a choice between two or more possible Actions. When you play the card, you will be able to choose which Action you wish to activate. Options are important for the Economy class.</li>
                            <li>A Eureka is a special type of Action, which only activates when the card is played as the first or last card in your hand. Eurekas are important for the Learning class.</li>
                            <li>An Event is something that happens whenever a card enters play – not just when you play it from your hand. It will never require you to choose a target.</li>
                            <li>A Death Event is a type of Event which activates when the card is destroyed, rather than when it enters play.</li>
                        </ul>
                        <p>Sometimes you might attach additional Actions or Events to a card – to view these, hover over the card and you will see them listed in a tooltip on the right. If an Action requires multiple targets, or a card has multiple Actions that each require a target, you will choose the targets one at a time, and there will be a tooltip next to your mouse cursor explaining which target selection you are currently making.</p>
                    </>
                ),
            },
            'Card Types': {
                'Introduction': (
                    <>
                        <p>Your decks are made up of cards of several types, each of which functions differently and represents a particular type of object from history.</p>
                        <br />
                        <p>They are:</p>
                        <ul>
                            <li>Leaders</li>
                            <li>Followers</li>
                            <li>Moments</li>
                            <li>Creations</li>
                            <li>Passives</li>
                            <li>Leader techniques</li>
                        </ul>
                    </>
                ),
                'Leaders': (
                    <>
                        <p>Your leader represents an important historical figure and is the most important card in your deck. If you kill your opponent’s leader, you win; if they kill yours, you lose. Every leader has their own unique leader technique – most are an active ability that can be used once a turn, though some are passive effects. For example, here are Napoleon Bonaparte and his leader technique, Levée en masse:</p>
                        <div className='big cardList'>
                            <BigCard key='howTo:NapoleonBonaparte' object={this.props.cards.NapoleonBonaparte} animations={dummyAnimations} selections={dummySelections} />
                            <BigCard key='howTo:NapoleonBonaparteLeveeEnMasse' object={this.props.cards.NapoleonBonaparteLeveeEnMasse} animations={dummyAnimations} selections={dummySelections} />
                        </div>
                        <h3>Combat</h3>
                        <p>Leaders can attack once per turn, but they can only ever attack followers – they cannot attack the enemy leader directly. They usually only do 1 damage with their attack, so you should judge carefully whether involving your leader in combat is worth the damage they’ll take. However, leaders become much more useful in combat when they have a weapon equipped, gaining increased Attack, and sometimes additional effects. For more about weapons, see the Creations section.</p>
                        <h3>Starter leaders</h3>
                        <p>Some leaders have the Starter keyword, which means you can start the game with it equipped. Other leaders can only be equipped after the game has started. When you equip a new leader, it replaces the old leader and its leader technique (which are moved to your legacy) and the new leader’s Health is added to your overall Health total.</p>
                    </>
                ),
                'Followers': (
                    <>
                        <p>Followers represent characters from history and will usually make up the bulk of your deck. When you play a follower, you choose an empty slot on your board to put it in. You normally have space for a maximum of eight followers in play at a time. In most match-ups, you will win or lose depending on how well you position and command your followers, and whether you are able to maintain control of the board and keep your opponent on the back foot.</p>
                        <h3>Combat</h3>
                        <p>Followers can attack once per turn. However, they cannot attack on the first turn they enter play, unless they have the Rush or Mob keywords (for more about those, see the Glossary section). If a follower has the Guard keyword, it will protect its leader and other friendly followers from being attacked – you will need to remove enemy Guard followers before you are able to attack other targets.</p>
                        <h3>Famous vs Nameless</h3>
                        <p>Followers come in two sub-types: famous followers and nameless followers. Famous followers represent specific unique individuals (though you can still include two copies in your deck, like any other card), while nameless followers represent a non-specific character. For example, here are Vladimir Lenin, a famous follower, and Subprime Borrower, a nameless follower:</p>
                        <div className='big cardList'>
                            <BigCard key='howTo:VladimirLenin' object={this.props.cards.VladimirLenin} animations={dummyAnimations} selections={dummySelections} />
                            <BigCard key='howTo:SubprimeBorrower' object={this.props.cards.SubprimeBorrower} animations={dummyAnimations} selections={dummySelections} />
                        </div>
                        <p>Famous followers tend to have greater individual power and a more immediate impact when they are played. Nameless followers often have more subtle effects, but in return they have charges, which allow them to be played from your hand multiple times before they are exhausted. Overall, nameless followers and famous followers should be of roughly equal power levels – just with different strengths and weaknesses.</p>
                        <h3>Follower categories</h3>
                        <p>In addition to being famous or nameless, there are also six follower categories, shown by icons located between the follower's Attack and Health. Followers can be members of one category, or multiple, or have no category. The categories are as follows: </p>
                        <ul>
                            <li>Barbarian (⚔) followers represent characters that, within some relevant context, were seen as relatively primitive or underdeveloped. These cards tend to make an immediate impact when they are played and are suited to aggressive decks. </li>
                            <li>Legend (🕮) followers represent characters that are fictional, mythological, portrayed from a religious perspective, historically inaccurate, or otherwise beyond the scope of conventional secular history. They often have a dramatic Event that triggers when they enter play.</li>
                            <li>Noble (⚜) followers represent characters born into positions of relative wealth, power, prestige, and privilege - not limited to literal aristocracy. They tend to be suited to controlling the board and slowing the pace of the game. </li>
                            <li>Tech (⚙) followers represent technological “characters”, such as tanks, boats, or holograms. They are always nameless followers, but with a single charge – as a result they feel like famous followers in power. They are strongest in decks that can give them additional charges, and also sometimes pair well with weapons.</li>
                            <li>Underclass (⛓) followers broadly represent characters at the bottom of society – spanning anything from literal slaves and serfs to marginalised or disadvantaged members of modern societies. They usually have strong stats and effects for their cost, but also drawbacks that make them challenging to use effectively.</li>
                            <li>Woman (♀) followers represent female characters. They are typically excellent value plays, drawing and generating the cards you need to keep going – with relatively low stats to compensate. Any deck that relies on drawing a lot of cards will likely rely on Woman followers.</li>
                        </ul>
                    </>
                ),
                'Moments': (
                    <>
                        <p>A moment represents a historical event or action – something that happens, and then passes. Unlike other types of card, a moment does not persist in play – when you play it, it does something, and then goes directly into your legacy. </p>
                        <h3>Actions and Events</h3>
                        <p>Moments come in two sub-types: actions and events. Event moments only ever have Event actions on them, while action moments can potentially have any combination of Actions, Options, Eurekas, and Events – for a full explanation of the difference between these, see "Actions vs Events" in the Basics section.</p>
                        <p>Here are examples of an action and an event: </p>
                        <div className='big cardList'>
                            <BigCard key='howTo:Vaporise' object={this.props.cards.Vaporise} animations={dummyAnimations} selections={dummySelections} />
                            <BigCard key='howTo:GeneralStrike1926' object={this.props.cards.GeneralStrike1926} animations={dummyAnimations} selections={dummySelections} />
                        </div>
                    </>
                ),
                'Creations': (
                    <>
                        <p>Creations represent a wide variety of things from history, such as places, ideas, or weapons. They do not have a Health stat – instead, each creation has a number of charges, and is destroyed when it loses its last charge. When a creation is put into play it goes in the creation zone, to the right of your leader. You normally have space for a maximum of four creations in play at a time. </p>
                        <h3>Sub-types</h3>
                        <p>Creations come in four sub-types – works, wonders, weapons, and techniques.</p>
                        <ul>
                            <li>A work can be many things: a painting, a book, a piece of music, a treaty, or a doctrine could all be works. A work loses a charge at the start of your turn – in practice, it is an effect that remains active for a certain number of turns after you play it.</li>
                            <li>A wonder represents a place: a building, a monument, or even a geographical feature such as a mountain or river. A wonder has a specific trigger that causes it to lose a charge. For some wonders, such as Statue of Liberty, you will want to avoid letting the trigger activate, to keep it in play as long as possible – for others, such as Twelve Tables, you will want to trigger it quickly and frequently.</li>
                            <li>A weapon can represent anything from a pointy stick to a nuclear bomb. A weapon adds its Attack stat to your leader’s during your turn, in addition to any keywords or effects it possesses. It loses a charge after your leader attacks. You can have multiple weapons equipped simultaneously: their effects will stack, but they will also all lose a charge after you attack.</li>
                            <li>A technique represents a skill, strategy, or invention. A technique has an Action or Event that activates when you use it, and loses a charge after each use. A technique can only be used once each turn, unless it has the Repeatable keyword. In effect, a technique is a moment that can be used multiple times.</li>
                        </ul>
                        <p>Here is an example of each of the four sub-types:</p>
                        <div className='big cardList'>
                            <BigCard key='howTo:BeveridgeReport' object={this.props.cards.BeveridgeReport} animations={dummyAnimations} selections={dummySelections} />
                            <BigCard key='howTo:StatueOfLiberty' object={this.props.cards.StatueOfLiberty} animations={dummyAnimations} selections={dummySelections} />
                            <BigCard key='howTo:FatMan' object={this.props.cards.FatMan} animations={dummyAnimations} selections={dummySelections} />
                            <BigCard key='howTo:Chemotherapy' object={this.props.cards.Chemotherapy} animations={dummyAnimations} selections={dummySelections} />
                        </div>
                    </>
                ),
                'Passives': (
                    <>
                        <p>The passive type is relatively uncommon, and is fairly flexible in what it represents. Mechanically, it is a permanent passive effect – it lasts indefinitely and cannot be destroyed. When a passive is in play, it goes in the passive zone, to the left of your leader. </p>
                        <h3>Ethoses</h3>
                        <p>An ethos is a special type of passive. Every deck includes exactly one ethos. It is in play from the beginning of the game, like your starting leader, and offers powerful situational benefits – you will need to construct your deck to make the most of your ethos.</p>
                    </>
                ),
            },
            'Glossary': {
                'Introduction': (
                    <p>This section will explain the meanings of the various terms and keywords that appear on cards.</p>
                ),
                'Stats': (
                    <>
                        <p>Beneath your leader is a bar displaying several important stats:</p>
                        <div className='playerStatusDiv'>
                            <PlayerStatus stats={{ money: 2, income: 2, growth: 1, debt: 0, rent: 0, fervour: 0, fatigue: 1 }} />
                        </div>
                        <h3>Money</h3>
                        <p>Your Money is the resource you spend to be able to play cards. It replenishes at the end of your turn. As well as appearing on your stat bar, you can also see your Money shown on your leader in green.</p>
                        <h3>Income</h3>
                        <p>Your Income is the amount your Money resets to at the end of your turn. Your Income starts at 2, and increases at the end of your turn (with no upper limit), allowing to you play increasingly powerful cards as the game goes on.</p>
                        <h3>Growth</h3>
                        <p>Your Growth is the amount by which your Income increases at the end of your turn. It is usually set to 1, but there are some cards that can increase or decrease it.</p>
                        <h3>Debt</h3>
                        <p>When you play a card with Debt, your Money will be reduced by that much next turn. The Debt stat shows how much your Money is due to be reduced by next turn.</p>
                        <h3>Rent</h3>
                        <p>If you have a card with Rent (X) in play, you spent that much Money on it at the end of every turn. The Rent stat shows the total Rent costs of your cards in play.</p>
                        <h3>Fervour</h3>
                        <p>The Fervour stat increases the power of your cards' Actions, as well as the Attack of your cards with the Passionate keyword. It is increased by your cards in play with the Fervour keyword.</p>
                        <h3>Fatigue</h3>
                        <p>Fatigue is a stacking penalty that you incur every time you attempt to draw but have no (eligible) cards in your deck, and every time you attempt to spend Money you don't have. When this happens, you will take damage equal to your Fatigue stat, and it will increase by 1. Avoid repeatedly taking Fatigue damage, as it will stack up very quickly.</p>
                    </>
                ),
                'Keywords': (
                    <>
                        <p>In the <em>History of Everything</em>, some common card effects are represented by keywords for brevity.</p>
                        <h3>Guard</h3>
                        <p>If a follower has the Guard keyword, it will prevent other friendly cards (including its leader) from being targeted with attacks. If your opponent has a Guard follower, you will need to remove it before you can attack anything else. If they have multiple Guard followers, you can choose which one to attack. If a follower in play has Guard, it will be visually represented by a thick grey border around the card.</p>
                        <h3>Rush</h3>
                        <p>Followers with Rush don't need to wait a turn to attack - they can attack followers (but not leaders) immediately.</p>
                        <h3>Mob</h3>
                        <p>Followers with Mob can attack immediately. However, they can only ever attack leaders if they have no followers - not just on the turn they enter play, but every turn. If your opponent has any followers, then to card with Mob it is as if they all have Guard.</p>
                        <h3>Fortune</h3>
                        <p>The first time a card with Fortune would take damage (or lose a charge, if it's a creation), it loses Fortune instead. Cards in play with Fortune are visually represented by a golden bubble over the card.</p>
                        <h3>Fervour (X)</h3>
                        <p>Cards with Fervour add to your overall Fervour stat, which increases the effect of Actions, as well as the Attack of cards with Passionate.</p>
                        <h3>Passionate</h3>
                        <p>Cards with Passionate gain extra Attack equal to your Fervour stat.</p>
                        <h3>Pillage</h3>
                        <p>When a card with Pillage deals damage, it also heals your leader by the same amount.</p>
                        <h3>Snipe</h3>
                        <p>When a card with Snipe attacks, it deals its damage to the defender first, before taking any damage in return. If it does enough damage to kill the defender, it will avoid receiving any damage at all.</p>
                        <h3>Bloodthirst</h3>
                        <p>After a character with Bloodthirst attacks and destroys its target, it is able to attack again.</p>
                        <h3>Collateral</h3>
                        <p>When a card with Collateral does single-target damage to a follower, it also hits the followers in the slots next to it.</p>
                        <h3>Repeatable</h3>
                        <p>A technique or leader technique with the Repeatable keyword can be used more than once each turn.</p>
                        <h3>Immune</h3>
                        <p>If a card is Immune, it ignores all damage (except Rot daamge), is not affected by destroy effects</p>
                        <h3>Lethal</h3>
                        <p>If a card with Lethal deals any damage to a follower (not a leader), it destroys it.</p>
                        <h3>Rot</h3>
                        <p>When a card with Rot deals damage, it does Rot damage. (see "Rot damage" in the Miscellaneous section for more)</p>
                        {/* <h3>Rot damage</h3>
                        <p>Rot damage reduces the target's max Health by the same amount. For example, if a follower had 3/5 Health and took 2 Rot damage, it would now have 1/3 Health. Additionally, Rot damage ignores Fortune and Immune. Rot damage is a good way to deal with followers that resurrect themselves - if their max Health has been reduced to 0 or less, they will be banished when they enter play. </p> */}
                        <h3>Income (X)</h3>
                        <p>Cards with Income add to your overall Income stat, which determines how much Money you regain at the end of your turn.</p>
                        <h3>Growth (X)</h3>
                        <p>Cards with Growth add to your overall Growth stat, which determines how much your Income increases by at the end of your turn.</p>
                        <h3>Rent (X)</h3>
                        <p>If a card has Rent, you will spend that much Money on it at the end of every turn it remains in play.</p>
                        <h3>Debt (X)</h3>
                        <p>If you play a card with Debt, you will have that much less Money to spend next turn.</p>
                        <h3>Starter</h3>
                        <p>If a leader has the Starter keyword, you can choose it as your deck's starting leader.</p>
                    </>
                ),
                'Actions and Effects': (
                    <>
                        <p>This section explains the various terms that appear before an effect or action in a card's text.</p>
                        <h3>Action:</h3>
                        <p>An Action is something that happens when a card is played normally from your hand. If the card is put into play by any other means, it will not activate.</p>
                        <h3>Option:</h3>
                        <p>An Option is a choice between two or more different Actions. You will choose which one you wish to activate when you play the card. Like Actions, an Option will only activate when a card is player normally from your hand.</p>
                        <h3>Eureka:</h3>
                        <p>A Eureka is type of Action, which only activates if the card was played from the leftmost or rightmost position in your hand. If a card has a Eureka, it will be highlighted orange when the Eureka is active.</p>
                        <h3>Event:</h3>
                        <p>An Event is something that happens whenever a card enters play - not just when it is played from your hand. If you put it directly into play from your deck, or summon a copy of it, or resurrect it, the Event will still activate.</p>
                        <h3>Death:</h3>
                        <p>A Death Event is a type of Event which activates when the card is destroyed, rather than when it enters play.</p>
                        <h3>[zone]:</h3>
                        <p>If an effect is preceded by the name of a zone, it means that the effect is only active when the card is in that zone. For example, if a follower has an effect beginning with "Legacy: ", that effect will only be active after the follower has died and moved into your legacy.</p>
                    </>
                ),
                'Miscellaneous': (
                    <>
                        <p>This section covers other terms not included in previous sections.</p>
                        <h3>Play</h3>
                        <p>If you play a card, it means you selected it from your hand and paid its Money cost, in the normal manner. If a card enters play by any other means, it does not count as playing it.</p>
                        <h3>Summon</h3>
                        <p>Summoning a card is the reverse of playing it - it means the card entered play by some means other than being played from your hand.</p>
                        <h3>Banish</h3>
                        <p>If a card is banished, it is removed directly from play and effectively no longer exists in the game. It does not die (and so does not trigger Death Events), and it does not go into your legacy. A card with Immune is not protected from being banished.</p>
                        <h3>Transform</h3>
                        <p>If a card is transformed, it means the card is banished and another one is summoned in its place.</p>
                        <h3>+X/+X</h3>
                        <p>When something would increase both a follower's Attack and Health, this is written in shorthand. For example, if you gave a follower +2 Attack and +1 Health, you would give it +2/+1.</p>
                        <h3>Clone</h3>
                        <p>A clone is an exact replica of a card in its current state - including any damage taken or missing charges, as well as any added effects or actions.</p>
                        <h3>Copy</h3>
                        <p>A copy is a fresh copy of the same card.</p>
                        <h3>Adjacents</h3>
                        <p>A follower's adjacents are the followers in the slots immediately to the left and right.</p>
                        <h3>Opposite</h3>
                        <p>A follower's opposite is the enemy follower in slot opposite it.</p>
                        <h3>Neighbours</h3>
                        <p>A follower's neighbours are its adjacents plus its opposite.</p>
                        <h3>Rot damage</h3>
                        <p>Rot damage reduces the target's max Health by the same amount. For example, if a follower had 3/5 Health and took 2 Rot damage, it would now have 1/3 Health. Additionally, Rot damage ignores Fortune and Immune. Rot damage is a good way to deal with followers that resurrect themselves - if their max Health has been reduced to 0 or less, they will be banished when they enter play. </p>
                        <h3>Nourish healing</h3>
                        <p>Nourish healing increases the target's max Health by the same amount. For example, if a follower had 3/5 Health and received 2 Nourish healing, it would now have 5/7 Health.</p>
                        <h3>Restore to full Health</h3>
                        <p>If a card restores its target to full Health, it will do healing equal to the target's missing Health. If it is Nourish healing, it will increase the target's max Health by the same amount. For example, if you were to Nourish heal a card with 2/7 Health to full health, it would now have 7/12 Health.</p>
                    </>
                )
            }
        }

        const sections = Object.keys(HowToContent).map(section => {
            const currentSection = this.state.section === section

            const subsections = currentSection
                ? Object.keys(HowToContent[this.state.section]).map(subsection => <tr key={subsection} className={`howToRow subsection ${this.state.subsection === subsection ? 'currentSection' : ''}`} onClick={() => this.setState({ subsection })} ><td className={`notTargetable`}>{subsection}</td></tr>)
                : null

            return <>
                <tr
                    key={section}
                    className={`howToRow section ${currentSection ? 'currentSection' : ''}`}
                    onClick={() => this.setState({ section, subsection: 'Introduction' })} >
                    <td className={`notTargetable`}>{section}</td>
                </tr>
                {subsections}
            </>
        })

        // const subsections = Object.keys(HowToContent[this.state.section]).map(subsection => <tr key={subsection} className='howToRow subsection' onClick={() => this.setState({ subsection })} ><td className={`notTargetable`}>{subsection}</td></tr>)

        const content = HowToContent[this.state.section][this.state.subsection]

        return (
            <div id='howToContainer' className={this.props.offscreen ? 'offscreen' : ''} >
                {/* <div className='howToLists'> */}

                <div className='howToList'>
                    <table className='howToListTable'>
                        {/* <thead><tr><td>Sections</td></tr></thead> */}
                        <tbody>
                            {sections}
                        </tbody>
                    </table>
                </div>
                {/* <div className='howToList'>
                        <table className='howToListTable'>
                            <thead><tr><td>Subsections</td></tr></thead>
                            <tbody>
                                {subsections}
                            </tbody>
                        </table>
                    </div> */}
                {/* </div> */}
                <div className='howToContentDiv'>
                    <h2>{this.state.subsection}</h2>
                    <div className='howToContent'>
                        {content}
                    </div>
                </div>
            </div>
        )
    }
}

export default HowToContainer