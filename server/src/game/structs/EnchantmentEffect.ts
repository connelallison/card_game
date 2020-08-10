import Effect from "../functionTypes/Effect";

interface EnchantmentEffect {
    effect: Effect,
    category: EffectCategoryString,
    value?: number
  }

export default EnchantmentEffect