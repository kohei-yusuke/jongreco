import React,{useState} from "react";

const selectHai = (props) =>{
    const haiContainer = () =>{
        return(
            <div className="container">
                <div className="row">

                </div>
            </div>
        )
    }

    const btnHai = (img_src) =>{
        return(
            <div className="col-1">
                <img 
                className="img-fluid"
                src = {img_src}
                />
            </div>
        );
    }

    return(
        <>
            <btnHai/>
        </>
    );
}

export default selectHai;

export async function getStaticProps(){
    let img_names=[];

    fs.readdir(__dirname,(err,files) =>{
        if(err){
            console.log(err);
        }else{
            files.forEach(file =>{
                img_names.push(file);
            })
        }
    });
    
    return{
        props:{"img_names":img_names}
    }
}