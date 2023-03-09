const IndexDescription = () =>{
    return(
        <div className="container bg-success p-3 text-light">
            <p>このアプリケーションは麻雀の最終得点を計算するためのものです</p>
            <p>1試合のみでも使用できますが複数の試合に対する点数の集計に対して最大限の力を発揮します</p>
            <p>ページ下部のリンクをタップして対局を開始してみましょう</p>
            <p>ただし、設定やリンク先のページに関しては以下のことに気を付けてください</p>
            <ul className="text-white-50">
                <small>
                    <li>ウマは1位と2位に関してのみ設定可能です。3位は2位の値、4位は1位の値の(-1)倍として設定されます</li>
                    <li>各局の得点は(素点-返し点)/10 +(ウマ)で計算されます</li>
                    <li>全試合終了までリンク先のページではブラウザバックやリロードはしないでください。</li>
                </small>
            </ul>
        </div>
    )
}

export default IndexDescription;