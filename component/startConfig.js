import {useRouter} from 'next/router'
import React,{useState, useEffect} from "react";


export const StartConfig = ()=>{
    const router = useRouter();

    const directions = ["東","南","西","北"];
    
    const [startScore,setStartScore] = useState(250);
    const [baseScore,setBaseScore] = useState(250);
    const [firstBonus,setFirstBonus] = useState(20);
    const [secondBonus, setSecondBonus] = useState(10);
    
    const [user0,setUser0] = useState(null);
    const [user1,setUser1] = useState(null);
    const [user2,setUser2] = useState(null);
    const [user3,setUser3] = useState(null);



    function clickButton() {


        router.push({
            pathname: "/matchResult",
            query: {
                startScore: startScore,
                baseScore: baseScore,
                firstBonus: firstBonus,
                secondBonus: secondBonus,
                user0: user0,  
                user1: user1,  
                user2: user2,  
                user3: user3
            }
        });
    }

    return(
        <div className="container bg-success p-3">
            <div className="text-center row">
                <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#defaultModal">リーグモード(設定へ)</button>
                <button type="button" className="btn btn-light" onClick={(e)=>{router.push("/scoreCalculator")}}>点数計算モード</button>
                </div>
            <div className="modal" id="defaultModal" tabindex="-1" role="dialog" aria-hidden="true" >
                    <div className="modal-dialog" role="document" >
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="startConfig">Setting</h5>                       
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="閉じる"></button>
                            </div>
                        

                        <div className="modal-body">
                            <>
                                <form>
                                    <div className="input-group">
                                        <span className="input-group-text" id="startScoreText">持ち点</span>
                                        <input className="form-control text-end" value={startScore}
                                        onChange = {event => setStartScore(event.target.value)}
                                        type = "number"
                                        placefolder = "対局開始時の持ち点"
                                        required
                                        />
                                        <span className="input-group-text" id="startScore00">00</span>
                                    </div>
                    
                                    <div className="input-group">
                                        <span className="input-group-text">返し点</span>
                                        <input className="form-control text-end" value={baseScore}
                                        onChange = {event => setBaseScore(event.target.value)}
                                        type = "number"
                                        placefolder = "返し点"
                                        required
                                        />
                                        <span className="input-group-text" id="baseScore00">00</span>
                                    </div>
                    
                                    <div className="input-group">
                                        <span className="input-group-text">1位ウマ</span>
                                        <span className="input-group-text">+</span>
                                        <input className="form-control text-end" value={firstBonus}
                                        onChange = {event => setFirstBonus(event.target.value)}
                                        type = "number"
                                        placefolder = "1位ウマ"
                                        required
                                        />
                                    </div>
                                    
                    
                                    <div className="input-group">
                                        <span className="input-group-text">2位ウマ</span>
                                        <span className="input-group-text">+</span>
                                        <input className="form-control text-end" value={secondBonus}
                                        onChange = {event => setSecondBonus(event.target.value)}
                                        type = "number"
                                        placefolder = "2位ウマ"
                                        required
                                        />
                                    </div>
                                </form>
                                <p>持ち点{startScore*100}点の{baseScore*100}点返し</p>
                            </>   
                            <form>
                            
                                <p>プレイヤーを入力してください</p>
                                
                                    <div className = "input-group">
                                            <span className="input-group-text">{directions[0]}</span>
                                            
                                                <input value={user0}
                                                className="form-control"
                                                key = "0"
                                                onChange = {e=>setUser0(e.target.value)}
                                                type = "text"
                                                placefolder = "user"
                                                required
                                                />                          
                                    </div>
                                                
                                    <div className = "input-group">
                                            <span className="input-group-text">{directions[1]}</span>
                                            
                                                <input value={user1}
                                                className="form-control"
                                                key = "1"
                                                onChange = {e=>setUser1(e.target.value)}
                                                type = "text"
                                                placefolder = "user"
                                                required
                                                />                    
                                    </div>
                                
                                
                                    <div className = "input-group">
                                            <span className="input-group-text">{directions[2]}</span>
                                            
                                                <input value={user2}
                                                className="form-control"
                                                key = "2"
                                                onChange = {e=>setUser2(e.target.value)}
                                                type = "text"
                                                placefolder = "user"
                                                required
                                                />                                   
                                    </div>
                                
                                
                                    <div className = "input-group">
                                            <span className="input-group-text">{directions[3]}</span>
                                            
                                                <input value={user3}
                                                className="form-control"
                                                key = "3"
                                                onChange = {e=>setUser3(e.target.value)}
                                                type = "text"
                                                placefolder = "user"
                                                required
                                                />                                    
                                    </div>
                                
                            </form>
                                    
                        </div>


                        <div className="modal-footer">
                            <a className="btn btn-primary"  type="button" onClick={()=>clickButton()} data-bs-dismiss="modal">対局開始</a>
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" >閉じる</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default StartConfig;