import { Link as InnerLink, NavLink as InnerNavLink } from 'react-router-dom'

/**
 * 为何要覆盖 Link、NavLink 组件？
 *
 * Link、NavLink 组件是对 <a> 标签的封装，拦截 onClick 点击事件来响应路由的变化； （源码@see:https://github.com/remix-run/react-router/blob/0ce0e4c728129efe214521a22fb902fa652bac70/packages/react-router-dom/index.tsx#L406）
 *
 * Taro 会将 <a> 标签映射为小程序的 navigator 标签。
 *
 * 在微信小程序中，运作正常； 然而在支付宝小程序中，navigator 不会触发 onTap 事件，从而无法进一步触发 <a> 标签的onClick事件，从而异常。
 *
 * 因此这里将 <a> 标签映射为小程序 view 标签，以保证可以正常触发点击事件。
 *
 */

export function Link(props){
  return <InnerLink as="view" {...props}></InnerLink>
}

export function NavLink(props){
  return <InnerNavLink as="view" {...props}></InnerNavLink>
}
