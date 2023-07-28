import React,{useState} from 'react'
import {useRouter} from 'next/router'
import { Chart, registerables } from "chart.js";
import { Line } from "react-chartjs-2";


const MatchResult = () =>{
    const router = useRouter();
   
    const [startScore, setStartScore] = useState(router.query.startScore);
    const [baseScore, setBaseScore] = useState(router.query.baseScore);
    const [firstBonus, setFirstBonus] = useState(router.query.firstBonus); 
    const [secondBonus, setSecondBonus] = useState(router.query.secondBonus);

    const startScoreToNumber = Number(startScore);
    const baseScoreToNumber = Number(baseScore);
    

    const user0 = router.query.user0;
    const user1 = router.query.user1;
    const user2 = router.query.user2;
    const user3 = router.query.user3;

    const [ScoreUser0, setScoreUser0] = useState("");
    const [ScoreUser1, setScoreUser1] = useState("");
    const [ScoreUser2, setScoreUser2] = useState("");
    const [ScoreUser3, setScoreUser3] = useState("");

    const [matchCount ,setMatchCount] = useState(1);
    ///現在の局数を表示
    const MatchNumberNow = () =>{
        return(
            <div className="fs-6 fw-bold">第{matchCount}局の得点</div>
        )
    }

    const ScoreInputMessage = () =>{
        return(
            <label className="form-label text-center fs-6 fw-bold" for="scoreInputGroup">得点を入力してください（現在は第{matchCount}局目）</label>
        )
    }

    ///1局ごとのスコアを格納する。
    const userAndScores = [
        {index:0,score:Number(ScoreUser0)},
        {index:1,score:Number(ScoreUser1)},
        {index:2,score:Number(ScoreUser2)},
        {index:3,score:Number(ScoreUser3)}
    ];


    ///scoreが大きい順にソート
    userAndScores.sort((a,b)=> b.score-a.score);

    const times_100 = (x) =>{
            var y;
            if(!x){
                return(0);
            }else{
            y =Number(x);
            return(100*y);
        }
    }

    ///userの順位をuserAndScoresのindexで取得
    const getIndexByOrder = (userIndex) =>{
        return(userAndScores.findIndex(({index})=> index === userIndex));
    }

    const orderBonusGet = (userIndex) =>{
        var order;
        order = getIndexByOrder(userIndex);

        if(order === 0){
            return (Number(firstBonus));
        }else if(order === 1){
            return (Number(secondBonus));
        }else if(order === 2){
            return (Number(-1*secondBonus));
        }else if(order === 3){
            return (Number(-1* firstBonus));
        }
    }
    
    ///合計が正しいかチェック
    const checkTotalScore = () =>{
        const correctSumScore = startScoreToNumber*4*100;
        var ScoresSum, isCorrect;
        ScoresSum = userAndScores.reduce((sum,element)=> {return(sum+element.score)},0)*100;
        isCorrect = (correctSumScore === ScoresSum);

        console.log(ScoresSum,correctSumScore);
        if (ScoresSum === 0){
            return (null);
        }
        if(!isCorrect){
            return(
                <div className="alert alert-danger py-1" role="alert">合計が正しくありません</div>
                )
        }
    }

    const matchResult = (userIndex) =>{
        let result = 0;
        let order;

        order = getIndexByOrder(userIndex);
        result = (userAndScores[order].score - baseScoreToNumber)/10 + orderBonusGet(userIndex);
        result = (Math.floor(result*Math.pow(10, 1)))/Math.pow(10,1);
        return(result);
    }


    ///全ての対局のスコアを保存する。
    const [resultArray, setResultArray] = useState([
        {index:0, user:user0, scores:[]},
        {index:1, user:user1, scores:[]},
        {index:2, user:user2, scores:[]},
        {index:3, user:user3, scores:[]}
    ]);

    const [sumResultArray,setSumResultArray] = useState([
        {index:0, user:user0, sumScores:[]},
        {index:1, user:user1, sumScores:[]},
        {index:2, user:user2, sumScores:[]},
        {index:3, user:user3, sumScores:[]}
    ]);

    const AddResult = () =>{
        for(let i=0 ;i<4 ;i++ ){        
            resultArray[i].scores.push(matchResult(i));            
            }
        
        for(let i=0;i<4; i++){
            if(matchCount===1){
                sumResultArray[i].sumScores.push(resultArray[i].scores[0]);
            }else{
                sumResultArray[i].sumScores.push(sumResultArray[i].sumScores[matchCount-2]+resultArray[i].scores[matchCount-1]);
            }
            
        }

        setMatchCount(matchCount+1);
        console.log(resultArray); 
        console.log(sumResultArray);   
        ///入力値をクリア
        setScoreUser0("");
        setScoreUser1("");
        setScoreUser2("");
        setScoreUser3("");
    }

    const submitMessage = () =>{
        return("第"+matchCount+"局のスコアを追加する。")
    }


    const ResultTableBody = () =>{
        const results =[];
        for (let i=0; i<matchCount-1; i++){
            results.push(
            <tbody>
                <tr>
                    <th>第{i+1}局</th>
                    <td>{resultArray[0].scores[i]}</td>
                    <td>{resultArray[1].scores[i]}</td>
                    <td>{resultArray[2].scores[i]}</td>
                    <td>{resultArray[3].scores[i]}</td>

                    <td>
                    <input
                    className="btn btn-danger"
                    type="submit"
                    value="削除"
                    key={i}
                    onClick={(e)=>DeleteScore(e)}
                    />
                    </td>
                </tr>
            </tbody>)
        }

        return(results);
    }

    ///Resultのスコアを削除する
    const DeleteScore = (e) =>{
        setMatchCount(matchCount-1);

        setSumResultArray([
            {index:0, user:user0, sumScores:[]},
            {index:1, user:user1, sumScores:[]},
            {index:2, user:user2, sumScores:[]},
            {index:3, user:user3, sumScores:[]}
        ]);

        console.log(sumResultArray,'before');

        for(let i=0; i<4; i++){
            resultArray[i].scores.splice(e.target.key,1);
           
            ///sumResultArrayに対する変更          
        }
        
    }

    ///全局のスコア合計を算出
    const ResultSums = () =>{
        const sums=[];

        const ResultSum = (i) =>{
            let resultSum = resultArray[i].scores.reduce((sum,element)=> {return(sum + element);},0)
            resultSum = (Math.floor(resultSum*Math.pow(10, 1)))/Math.pow(10,1);

            return(resultSum);
        }
        
        for(let i=0; i<4; i++){
            sums.push(
                <td>{ResultSum(i)}</td>
                )
        }

        return(sums);
    }
    ///全対局の順位を取得
    const GetOrder = () => {
      const ResultSum = (i) => {
        return resultArray[i].scores.reduce((sum, element) => sum + element, 0);
      };
    
      const sums = [
        { user: 0, sum: ResultSum(0) },
        { user: 1, sum: ResultSum(1) },
        { user: 2, sum: ResultSum(2) },
        { user: 3, sum: ResultSum(3) }
      ];
    
      // sumsを合計得点の降順にソート
      const sortedSums = sums.sort((a, b) => b.sum - a.sum);
      
      // 新しい配列sumsAndOrderを作成し、orderプロパティを追加する
      const sumsAndOrder = sortedSums.map(( entry, index)=>{
        return {
          ...entry,
          order: index+1
        };
      });

      sumsAndOrder.sort((a,b)=> a.user - b.user);//昇順0，1，2，3...

      const ordersJSX = sumsAndOrder.map((entry, index) => (
        <td key={index}>{entry.order}</td>
      ));
    
      return ordersJSX;
    };
    

    ///全試合データを表示する
    const AllMatchResultTable = () =>{
        return(
            <div className="container table-responsive text-nowrap text-center mb-3 p-3 bg-light">
                <div className="fs-6 fw-bold">全対局の結果</div>
                <table className="table table-light border border-2 border-dark">
                    <thead>
                        <tr className="table-info">
                            
                            <th scope="col">名前</th>                          
                            <th scope="col">{user0}</th>
                            <th scope="col">{user1}</th>
                            <th scope="col">{user2}</th>
                            <th scope="col">{user3}</th>
                            <th></th>
                        </tr>
                    </thead>

                    <ResultTableBody/>

                    <tbody>
                        <tr>
                            <th scope="row">合計</th>
                            <ResultSums/>
                            <td></td>
                        </tr>             
                    </tbody>

                    <tbody>
                        <tr className="table-success">
                            <th scope="row">順位</th>
                            <GetOrder/>
                            <td></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        );
    }
    
    ///グラフで表示する
    Chart.register(...registerables)

    const ResultGraph = () => {
        const labels = [];

        for(let i=1; i<matchCount;i++){
            labels.push(i);
        }

        ///一局ごと
        const asOneMatchData = {
            labels: labels,
            datasets: [
            {
                label: user0,
                data: resultArray[0].scores,
                borderColor: "yellow",
            },
            {
                label: user1,
                data: resultArray[1].scores,
                borderColor: "red"
            },
            {
                label: user2,
                data: resultArray[2].scores,
                borderColor: "green"
            },
            {
                label: user3,
                data: resultArray[3].scores,
                borderColor: "blue"
            },
            ],
        }

        const sumResultData = {
            labels: labels,
            datasets: [
            {
                label: user0,
                data: sumResultArray[0].sumScores,
                borderColor: "yellow",
            },
            {
                label: user1,
                data: sumResultArray[1].sumScores,
                borderColor: "red"
            },
            {
                label: user2,
                data: sumResultArray[2].sumScores,
                borderColor: "green"
            },
            {
                label: user3,
                data: sumResultArray[3].sumScores,
                borderColor: "blue"
            },
            ],
        }

        const options = {
            maintainAspectRatio: false,
            plugins:{
                title:{
                    display:true,
                    text:'一局ごと',
                    padding: {
                        top: 1,
                        bottom:1
                    }
                }
            }
        }

        return (
            <div>
                <div className="container text-center bg-light p-3 mb-3">
                    <Line data={asOneMatchData} options={options} />
                </div> 
            </div>      
        )
    }

    ///indexへのボタン
    const ToIndex = () =>{

    }

    ///MatchResultのreturn
    return(
        <>  
            <div className="container mb-3 p-3 bg-light">
                <ScoreInputMessage/>
                <div className='input-group' id="scoreInputGroup">
                    <div className="input-group">
                        <span className="input-group-text">{user0}</span>
                        <input 
                        className = "form-control text-end"
                        value={ScoreUser0}
                        key = "0"
                        onChange = {e => setScoreUser0(e.target.value)}
                        type = "number"
                        />
                        <span className="input-group-text">00</span>
                    </div>

                    <div className="input-group">
                        <span className="input-group-text">{user1}</span>
                        <input 
                        className = "form-control text-end"
                        value={ScoreUser1}
                        key = "1"
                        onChange = {e => setScoreUser1(e.target.value)}
                        type = "number"
                        />
                        <span className="input-group-text">00</span>
                    </div>

                    <div className="input-group">
                        <span className="input-group-text">{user2}</span>
                        <input 
                        className = "form-control text-end"
                        value={ScoreUser2}
                        key = "2"
                        onChange = {e => setScoreUser2(e.target.value)}
                        type = "number"
                        />
                        <span className="input-group-text">00</span>
                    </div>

                    <div className="input-group">
                        <span className="input-group-text">{user3}</span>
                        <input 
                        className = "form-control text-end"
                        value={ScoreUser3}
                        key = "3"
                        onChange = {e => setScoreUser3(e.target.value)}
                        type = "number"
                        />
                        <span className="input-group-text">00</span>
                    </div>
                    {checkTotalScore()}
                </div>
                
            </div>
            <div className="container mb-3 bg-light">
                <div className="table-responsive  text-nowrap text-center">
                    <MatchNumberNow/>
                    <table className="table table-light border border-2 border-dark">
                        <thead>
                            <tr className="table-info">
                                <th scope="col">名前</th>
                                <th scope="col">{user0}</th>
                                <th scope="col">{user1}</th>
                                <th scope="col">{user2}</th>
                                <th scope="col">{user3}</th>
                            </tr>
                        </thead>

                        <tbody>
                            <tr>
                                <th scope="row">素点</th>
                                <td>{times_100(ScoreUser0)}</td>
                                <td>{times_100(ScoreUser1)}</td>
                                <td>{times_100(ScoreUser2)}</td>
                                <td>{times_100(ScoreUser3)}</td>
                            </tr>
                        </tbody>

                        <tbody>
                            <tr>
                                <th scope="row">ウマ</th>
                                <td>{orderBonusGet(0)}</td>
                                <td>{orderBonusGet(1)}</td>
                                <td>{orderBonusGet(2)}</td>
                                <td>{orderBonusGet(3)}</td>
                            </tr>
                        </tbody>

                        <tbody>
                            <tr>
                                <th scope="row">得点</th>
                                <td>{matchResult(0)}</td>
                                <td>{matchResult(1)}</td>
                                <td>{matchResult(2)}</td>
                                <td>{matchResult(3)}</td>
                            </tr>
                        </tbody>

                        <tbody>
                            <tr className="table-success">
                                <th scope="row">順位</th>
                                <td>{getIndexByOrder(0)+1}</td>
                                <td>{getIndexByOrder(1)+1}</td>
                                <td>{getIndexByOrder(2)+1}</td>
                                <td>{getIndexByOrder(3)+1}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>               
            </div>

            <div className="container p-3 mb-3 bg-light">
                <input
                className = "form-control fs-6 fw-bold"
                type = "submit" 
                value={submitMessage()}
                onClick = {()=>AddResult()}
                />
            </div>

            <AllMatchResultTable/>
            <ResultGraph/>
        </>
    )
}

export default MatchResult;