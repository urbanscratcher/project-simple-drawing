# Simple Drawing App

- p5js로 만든 간단한 그림판 앱

## 목적

- p5js DOM 연습
- 드로잉 툴 원리 익히기

## 기능
- 자유선 (색상, 굵기 선택)
- 직선 (색상, 굵기 선택)
- 지우개 (굵기 선택)
- 스프레이 (색상 선택)
- 모두 지우기
- png 파일로 저장
- 다른 도구를 선택해도 색상, 굵기 등 옵션 상태가 유지될 수 있도록 함

## 데모
[demo-drawing.webm](https://github.com/urbanscratcher/project-simple-drawing/assets/17016494/7f3eb368-1d08-4daf-9ac2-f385d349c133)


## URL

- https://joun-drawing.netlify.app

## 사용 라이브러리 & 기술

- p5js
- p5js DOM

## 개발 여담
- 튜토리얼 찾아보다가 삘 받아서 뚝딱
- p5js는 프레임이 루핑된다는 개념이 중요한데 아직은 감이 잘 안 잡힌다. 좀 더 파야할 듯
  - 전에 만든 게임이 시간을 많이 갈았는데 그래픽(절대값 x,y.....) 조정하기가 너무 귀찮아서 아직 업로드를 못하고 있다는 안타까운 이야기
  - 그래도 가능성이 무궁무진해서 재밌는 라이브러리
- 웹개발자로서 p5js DOM은 기능이 다소 부족한 것 같다. 특히 상태 관리나 노드 선택하는 부분 등 
  
## 발전시킬 것들

- 클래스화 시켜야 할지 고민 중
- select
- undo/redo
- zoom
- 3D 모델(.obj) 불러오기
- 최종: random word 던져주고 타이머 맞춰서 그림 그리도록 하는 기능
