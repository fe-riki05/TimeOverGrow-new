# TIMEOVERGROW

# アプリ概要
転職活動用のポートフォリオとして開発した個人アプリです。未経験からエンジニア転職を目指す方をターゲットにしており、チャート図やGitHubで使われているヒートマップ図を導入することでプログラミング学習の自己管理ができます。「TIMEOVERGROW」は、学習に時間を費やせば費やすほどエンジニアとして成長できるといった想いを込めて名付けました。

- 記事を投稿・編集・削除できる
- これまでの合計学習時間とタグ毎の合計学習時間を一目で確認できる機能を実装
- vue-heartmapを導入し、GitHubの草を生やす機能を実装


# 本番環境
https://timeovergrow-d76f5.web.app/

テストログインが可能です。


# このアプリを開発した背景
**「エンジニアを目指しているけれど、モチベーションが続かなく、挫折をしてしまいそうな人に、学習する習慣を提供したい」という想いでこのアプリを開発しました。**

私自身完全未経験からエンジニアを目指して転職活動中ですが、TwitterなどのSNSで日々情報収集をしていると、エンジニア転職を諦める内容のものを何度も見かけました。私の場合、エンジニアを諦めようとは思いませんでしたが、モチベーションが下がることはあり、その日はどうしても学習の進捗が思う様にいきませんでした。

私なりにモチベーションが下がってしまう原因を考え抜いた結果、**自分の現状を把握できていない為、行動に迷いが生じている**という1つの結論に至りました。では、**自分の現状を把握する**方法についてですが、これも私なりの考えがあり、それはつまり**言語化**することで**現状の把握ができる**と考えています。

日々の学習内容を言語化することで、今の現状が整理され、次に何をするべきか明確になります。

私自身試した結果、**数日前と比較をすることで成長をより実感しやすくなり、モチベーションを保ちやすくなりました！**
また、合計学習時間とタグ毎の合計学習時間を時間軸の棒グラフで確認でき、ヒートマップ図では学習の継続の確認ができるので、日々の学習の管理はこのアプリ1つでできます。

ですので、エンジニアを目指しているけれど、モチベーションが続かなく、挫折をしてしまいそうな人に、是非このアプリを通して**学習する習慣**を提供できたら、と思います。


# 実際のアプリの動画
![ezgif com-gif-maker](https://user-images.githubusercontent.com/70131371/111287871-fdfeb580-8686-11eb-82de-b59d14715cca.gif)


# 工夫した部分
## Nuxt.jsを導入してSPA化することでUXを大幅に向上させたこと
通常webアプリでは、画面を遷移する度にページ全体をレンダリングしている為読み込みに時間がかかってしまいます。そこでSPA化することで**変更が必要な部分のみをレンダリングする**という形式をとり、滑らかな画面の遷移を実現しています。

## UIにこだわったこと
- TIMEOVERGROWを開発するにあたり**メインカラー**をどうしようか悩んだことがありました。その時以前webデザインを学んだ際に**色彩心理学**というものを学んだことを思い出しました。具体的には、**茶色だと温もりや居心地の良さを表現できる**などです。こちらを参考に、**気持ちを落ち着かせ集中力を増加させる心理効果がある青色**をメインカラーとしてTIMEOVERGROWでは採用しました。
- フォントの色は**ユーザーの目に負担をかけない様にする為**、完全な**黒色**ではなく、少しグレー寄りの**黒色**を採用しております。

# 特に見て欲しい点

- 開発の過程をGitHub issueにまとめている点。
  - 1つの機能を実装する毎に1つissueを立てて作業をしました。言語化して細分化することで、どんなに難しい機能でも簡単な機能の集合体にすぎないという考え方を学ぶことができました。
  - **実装して終わりではなく**、GitHub issueをTODOリストとして活用することで、GitHubのみでプロジェクトの進捗具合が分かるメリットだったり、レビューの貰い方だったり、共同開発では必須のGitHubの使い方を理解しました。

- GitHub Actionsを導入してCI/CDパイプラインを構築している点。
  - GitHub Actionsが実行されるとテストとデプロイが自動で行われ、コマンドを打ち忘れるというヒューマンエラーを仕組み化で解決しました。こういった**人の作業が自動化されることにプログラミングの面白さや可能性を感じます。**

# 苦労したこと
## DB設計のやり直し
**DBの参照**について理解不足だった為、ユーザー毎の識別の実装をしておらずデータが共有されている状態でした。
デプロイ後にエンジニアの方からのレビューで誤りに気づくことができました。

この経験から、最初の段階でアプリの仕様をきちんと決め、それに基づいた**DB設計**をしなければ後々かなり面倒なことになることを学びました。
この経験を反面教師に、今後のアプリ開発に活かしたいと思います。


# アプリのポイント
- 現役のエンジニアの方に実際にアプリを使ってもらい、主に機能面でフィードバックを受けて改善
- 現役のwebディレクターの方から主にUI/UXの面でフィードバックを受けて改善
- 直感的に分かるデザイン
- 完全に独学で開発
- 開発環境でDockerを採用することでスムーズにチーム開発が可能


# 今後実装したい機能
- Nuxt.jsを導入しているので、SSR化してさらにUXを向上
- PWAを導入し、プッシュ通知の機能の導入(例えば、合計学習時間が100時間達成毎に通知する機能など)
- 1週間や1ヶ月といった期間の目標設定の機能の実装
- アウトプット内容を記載するエリアのUXの向上


# 使用技術等
- OS：macOS
- 開発環境：Docker node.jsコンテナを用意して、docker-composeで起動します。(このアプリでは必要なさそうに見えましたが、ここ最近モダンな現場ではDockerを用いる事例が多いとリサーチ済みですので、経験のため導入致しました。)
- フロントエンド：JavaScript(Nuxt.js/Vue.js)
- UIフレームワーク：Vuetify
- バックエンド：Firebase
  - 認証：Firebase Authentication
- データベース：Cloud Firestore
- 本番環境：Firebase Hosting
- テスト：Jest
- ソースコード管理：GitHub
- 静的検証ツール：ESLint
- コードフォーマッター：Prettier
- CI/CD：GitHub Actions
 - GitHubのマスターブランチにマージされた時のみテストと自動デプロイが実行されます。


## バージョン

|  tool  |  version  |
|  :---:  |  :---:  |
|  macOS  |  11.1  |
|  Docker  |  20.10.2  |
|  docker-compose  |  1.27.4  |
|  Nuxt.js  |   2.14.12  |
|  Vuetify  |   2.4.6  |
|  Firebase  |   8.2.4  |
|  vue-chart.js  |   3.5.1  |
|  vue-calendar-heatmap  |   0.8.4  |
|  ESLint  |   7.21.0  |
|  Prettier  |   2.2.1  |
|  Jest  |   26.6.3  |


# 機能一覧

- ユーザー機能
- リダイレクト機能
- タグ付け機能
- タグの編集・削除機能
- アウトプット機能
- 合計学習時間の表示機能
- タグ毎の合計学習時間を表示
- 毎日の学習チェック機能
- 毎日の学習量表示機能
- テスト機能


# 機能詳細
## ユーザー機能
- 新規登録、ログイン、ログアウト
- テストログイン機能

## リダイレクト機能
- middlewareを使用し、ログインの状態が確認できない場合はトップページへリダイレクト

## タグ付け機能
- VuetifyのUIコンポーネントのv-comboboxを使用
- タグ名は自由に入力可能
- アウトプット内容に複数のタグを付けられる機能
- 1度入力したタグを予測変換として表示する機能

## タグの編集・削除機能
- 1度入力したタグを編集、削除することが可能

## アウトプット機能
- アウトプット内容の一覧表示、アウトプット内容の投稿、編集、削除機能
- タグ、学習時間、アウトプット内容のいずれかが空欄の時警告のアラートが表示
- VuetifyのUIコンポーネントのv-alertを使用

## 合計学習時間の表示機能
- Chart.js、vue-chartjsを使用し、これまでの合計学習時間を表示

## タグ毎の合計学習時間を表示
- タグのデータ、Chart.js、vue-chartjsを使用し、これまでのタグ毎の合計学習時間を表示

## 毎日学習できるかチェック機能
- vue-calendar-heatmapを導入することでGitHubのマップを再現
- これにより学習していれば色がつくので一目で継続して学習できているか確認可能

## 毎日の学習量表示機能
- vue-calendar-heatmapを導入することでGitHubのマップを再現
- マスの色を5段階に分けており、1時間未満の学習だと1段階目の色、2時間以上の学習だと2段階目と、学習時間が増える毎にマスの色を濃くしていき、5時間以上の学習で最も濃い色のマスになる様に実装。
- 1日も学習しなかった日はマスに色はつかない様になっています。

## テスト機能
- Jestを使用



