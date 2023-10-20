import { Func } from "../core/func";
import { MousePointer } from "../core/mousePointer";
import { MyDisplay } from "../core/myDisplay";
import { Tween } from "../core/tween";
import { Util } from "../libs/util";
import { Item } from "./item";

// -----------------------------------------
//
// -----------------------------------------
export class Contents extends MyDisplay {

  private _item: Array<Item> = []

  constructor(opt:any) {
    super(opt)

    const num = Func.val(20, 30)
    for(let i = 0; i < num; i++) {
      const el = document.createElement('div')
      el.classList.add('js-item')
      this.el.prepend(el)

      this._item.push(new Item({
        el: el,
        id: i,
      }))
    }
  }

  protected _update():void {
    super._update();

    const mx = MousePointer.instance.easeNormal.x
    const my = MousePointer.instance.easeNormal.y
    const sw = Func.sw()
    const sh = Func.sh()
    const radius = Math.min(sh, sw) * Util.map(my, 0.01, 0.4, -1, 1)
    const centerX = sw / 2 + (mx * sw * 0)
    const centerY = sh / 2 + (my * sh * 0)

    const w = (Math.max(sw, sh) / this._item.length) * 2
    const h = w * 3

    this._item.forEach((item, i) => {
      const rad = Util.radian(this._c * 0.5 * (i % 2 == 0 ? 1 : -1) + i * (360 / this._item.length))
      const x = Math.sin(rad) * radius - w * 0
      const y = Math.cos(rad) * radius - h * 0
      const dx = x
      const dy = y
      const ang = Math.atan2(dy, dx)
      Tween.set(item.el, {
        x: centerX + x - w * 0.5,
        y: centerY + y - h * 0.5,
        width: w,
        height: h,
        rotationZ: Util.degree(ang) + 90 + this._c * 2 * (i % 2 == 0 ? 1 : -1),
      })
    })
  }
}