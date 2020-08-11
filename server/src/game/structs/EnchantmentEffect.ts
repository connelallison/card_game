import Effect from "../functionTypes/Effect";
import EffectCategoryString from "../stringTypes/EffectCategoryString";

interface EnchantmentEffect {
    effect: Effect,
    category: EffectCategoryString,
    value?: number
  }

export default EnchantmentEffect