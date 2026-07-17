# 인생 퀘스트 다운로드 사이트

## 바로 확인
`index.html`을 더블클릭하면 브라우저에서 확인할 수 있습니다.

## 다운로드 주소와 버전 수정
`site-config.js` 파일만 열어서 아래 값을 바꾸세요.

```js
window.LIFE_QUEST_SITE = {
  version: "0.19.0",
  downloadUrl: "GitHub Release 또는 설치파일 주소"
};
```

## 무료로 사이트 올리는 방법

### GitHub Pages
1. 새 GitHub 저장소를 만듭니다.
2. 이 폴더의 파일을 모두 업로드합니다.
3. 저장소 `Settings` → `Pages`
4. `Deploy from a branch` 선택
5. `main` / `/root` 선택 후 저장
6. 잠시 후 `https://아이디.github.io/저장소이름/` 주소가 생성됩니다.

### Cloudflare Pages 또는 Vercel
이 폴더를 업로드하면 정적 사이트로 바로 배포할 수 있습니다.

## 포함 파일
- `index.html`: 사이트 구조
- `styles.css`: 디자인
- `app.js`: 메뉴와 설정 적용
- `site-config.js`: 최신 버전과 다운로드 링크
- `assets/favicon.svg`: 사이트 아이콘

## 참고
브라우저의 실제 다운로드 창이나 Windows 보안창은 사이트 디자인으로 변경할 수 없습니다.
사이트 안의 다운로드 화면, 버튼, 설명과 업데이트 페이지는 자유롭게 바꿀 수 있습니다.
