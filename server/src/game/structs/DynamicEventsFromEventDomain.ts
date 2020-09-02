import EventsDomainString from "../stringTypes/EventsDomainString";

interface DynamicEventsFromEventDomain {
    valueType: 'events',
    from: 'eventDomain',
    // requirements?: EventRequirementObject[],
    eventDomain: EventsDomainString | EventsDomainString[],
}

export default DynamicEventsFromEventDomain