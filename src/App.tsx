import { createGlobalStyle } from "styled-components";
import Router from "./Router";
import { Fragment, useState } from "react";

import { ReactQueryDevtools } from "react-query/devtools";

import { ThemeProvider } from "styled-components";
import { darktheme, lighttheme } from "./theme";
// recoil
import { useRecoilValue } from "recoil";

import { isDarkAtom } from "./atom";

const GlobalStyle = createGlobalStyle`
/* http://meyerweb.com/eric/tools/css/reset/ 
   v2.0 | 20110126
   License: none (public domain)
*/
@import url('https://fonts.googleapis.com/css2?family=Bungee+Spice&family=Nanum+Pen+Script&family=Yeon+Sung&display=swap');
html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed, 
figure, figcaption, footer, header, hgroup, 
menu, nav, output, ruby, section, summary,
time, mark, audio, video {
	margin: 0;
	padding: 0;
	border: 0;
	font-size: 100%;
	font: inherit;
	vertical-align: baseline;
}
/* HTML5 display-role reset for older browsers */
article, aside, details, figcaption, figure, 
footer, header, hgroup, menu, nav, section {
	display: block;
}
body {
	line-height: 1;
}
ol, ul {
	list-style: none;
}
blockquote, q {
	quotes: none;
}
blockquote:before, blockquote:after,
q:before, q:after {
	content: '';
	content: none;
}
table {
	border-collapse: collapse;
	border-spacing: 0;
}

* {
  box-sizing:border-box
}
body{
  font-family: 'Bungee Spice', cursive;
  background-color: ${(props) => props.theme.bgColor};
  color:${(props) => props.theme.textColor}
}

a{
  text-decoration:none;
  color:inherit
}
`;

const App = () => {
  // atom value가져올때(설정되있음)사용
  const isDark = useRecoilValue(isDarkAtom);

  return (
    <Fragment>
      {/* ThemeProvider를 index -> App으로옮긴이유는 state를 사용하기위함 -> 다른 component에도 props로 보내려고 여기로옮김 */}
      <ThemeProvider theme={isDark ? darktheme : lighttheme}>
        <GlobalStyle />
        <Router />
        <ReactQueryDevtools initialIsOpen={true} />
      </ThemeProvider>
    </Fragment>
  );
};

export default App;

// useRecoilValue(state)

// Recoil state값을 반환합니다.
// 이 hook은 암묵적으로 주어진 상태에 컴포넌트를 구독합니다.
// 이 hook는 읽기 전용 상태와 쓰기 가능 상태에서 모두 동작하므로 컴포넌트가 상태를 읽을 수만 있게 하고 싶을 때에 추천하는 hook입니다. 이 hook을 React 컴포넌트에서 사용하면 상태가 업데이트 될 때 리렌더링을 하도록 컴포넌트를 구독합니다.
// ex) const names = useRecoilValue(namesState);

// https://recoiljs.org/ko/docs/api-reference/core/useRecoilValue/

// useSetRecoilState(state)

// Recoil state의 값을 업데이트하기 위한 setter 함수를 반환합니다.
// 상태를 변경하기 위해 비동기로 사용될 수 있는 setter 함수를 리턴합니다.
// setter는 새로운 값이나 이전 값을 인수로 받는 updater 함수를 넘겨줍니다.
// ex) const setNamesState = useSetRecoilState(namesState);

// https://recoiljs.org/ko/docs/api-reference/core/useSetRecoilState/
