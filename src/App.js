import React from "react";
import mailSvg from "./assets/mail.svg";
import manSvg from "./assets/man.svg";
import womanSvg from "./assets/woman.svg";
import manAgeSvg from "./assets/growing-up-man.svg";
import womanAgeSvg from "./assets/growing-up-woman.svg";
import mapSvg from "./assets/map.svg";
import phoneSvg from "./assets/phone.svg";
import padlockSvg from "./assets/padlock.svg";
import cwSvg from "./assets/cw.svg";
import Footer from "./components/footer/Footer";
import axios from "axios";
import { useState, useEffect } from "react";


const url = "https://randomuser.me/api/";
// const defaultImage = "https://randomuser.me/api/portraits/men/75.jpg";

function App() {

  const [data, setData] = useState([])
  const [value, setValue] = useState("")
  const [desc, setDesc] = useState("name")
  const [adduser, setAdduser] = useState()


  const getUser = async () => {
    const {data:{results}} = await axios(url)
    console.log(results[0])
    const {
      picture: { large },
     id,
      name: {title, first, last},
      email,
      cell, gender,
      location: {state, country},
      dob: { date, age },
      login:{password}
    } = results[0]
    setData({large,id,title, first, last,email,
      cell, gender,state, country,date, age, password})
    setValue(results[0]?.name.title+" "+results[0]?.name.first+" "+results[0]?.name.last)
  }

  useEffect(() => {
    getUser()
  }, [])

  const getInfo = (e)=> {
    switch (e.target.alt){
      case "user":
        setDesc("name")
        setValue(data?.first+""+data?.last)
        break;
      case "mail":
        setDesc("mail")
        setValue(data?.email)
        break;
      case "age":
        setDesc("age")
        setValue(data?.age)
        break;
      case "map":
        setDesc("adress")
        setValue(data?.state+"/"+data?.country)
        break;
      case "phone":
        setDesc("phone")
        setValue(data?.cell)
        break;
      case "lock":
        setDesc("password")
        setValue(data?.password)
        break;
    }

  }

  const getNewuser = () => {
      getUser()
  }

  const getAdduser = () => {

    const user = {
      name: data?.first,
      email: data?.email,
      phone: data?.cell,
      age: data?.age,
      id:data?.id.value,
    }

    setAdduser([...adduser,user])
  
  }

  return (
    <main>
      <div className="block bcg-orange">
        <img src={cwSvg} alt="cw" id="cw" />
      </div>
      <div className="block">
        <div className="container">
          <img src={data?.large} alt="random user" className="user-img" />
          <p className="user-title">My {desc} is</p>
          <p className="user-value">{value}</p>
          <div className="values-list">
            <button className="icon" data-label="name">
              <img src={data?.gender === "female" ? womanSvg : manSvg} alt="user" id="iconImg" onClick={getInfo} />
            </button>
            <button className="icon" data-label="email">
              <img src={mailSvg} alt="mail" id="iconImg" onClick={getInfo} />
            </button>
            <button className="icon" data-label="age">
              <img src={data?.gender === "female" ? womanAgeSvg : manAgeSvg} alt="age" id="iconImg" onClick={getInfo} />
            </button>
            <button className="icon" data-label="street">
              <img src={mapSvg} alt="map" id="iconImg" onClick={getInfo}  />
            </button>
            <button className="icon" data-label="phone">
              <img src={phoneSvg} alt="phone" id="iconImg" onClick={getInfo} />
            </button>
            <button className="icon" data-label="password">
              <img src={padlockSvg} alt="lock" id="iconImg" onClick={getInfo} />
            </button>
          </div>
          <div className="btn-group">
            <button className="btn" type="button" onClick={getNewuser}>
              new user
            </button>
            <button className="btn" type="button" onClick={getAdduser}>
              add user
            </button>
          </div>

          <table className="table">
            <thead>
              <tr className="head-tr">
                <th className="th">Firstname</th>
                <th className="th">Email</th>
                <th className="th">Phone</th>
                <th className="th">Age</th>
              </tr>
            </thead>
            <tbody>
            {adduser?.map((item,index) => {
                const{name,email,phone,age}=item
                return(
                    <tr className="body-tr" key={index} >
                      <td>{name}</td>
                      <td>{email}</td>
                      <td>{phone}</td>
                      <td>{age}</td>
                    </tr>
                  )
              })}
            </tbody>
          </table>
        </div>
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Footer />
      </div>
    </main>
  );
}

export default App;
