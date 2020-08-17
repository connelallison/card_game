import NumberModObject from "./NumberModObject";

interface CompoundDynamicNumberObject {
    valueType: 'number',
    baseValue: number,
    numberMods: NumberModObject[],
}

export default CompoundDynamicNumberObject