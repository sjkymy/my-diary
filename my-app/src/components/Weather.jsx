import axios from "axios";
import styled from "styled-components";
import { useState } from "react";
import { useEffect } from "react";

export default function Weather() {
    
    const [location, setLocation] = useState("")
    const [result, setResult] = useState({});
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=3bee6a724f0b498cb3d4d5c31365533a`
    
  const todayWeather = async (e) => {
    try {
        const data = await axios({
            method: "get",
            url: url
        })
        console.log(data);
        setResult(data);
    }
    catch (err) {
        console.log(err);
    }
  }

  useEffect(() => {
    todayWeather();
  }, [location])
  

  return (
    <AppWrap>
        <div className="appContentWrap">
            <select
                value={location}
                onChange={(e) => {setLocation(e.target.value)}}
            >
                <option value="">--도시를 선택하세요--</option>
                <option value="Seoul">서울</option>
                <option value="Incheon">인천</option>
                <option value="Daejeon">대전</option>
                <option value="Daegu">대구</option>
                <option value="Gwangju">광주</option>
                <option value="Busan">부산</option>
            </select>
        </div>
        {Object.keys(result).length !== 0 && (
            <ResultWrap>
                <div className="temperature">
                    {Math.round(((result.data.main.temp - 273.15) * 10)) / 10}도
                </div>
                <div className="sky">{result.data.weather[0].main}</div>
            </ResultWrap>
        )}
        
    </AppWrap>
  )
}

const AppWrap = styled.div`
    width: 200px;
    border: 1px solid red;

    .appContentWrap {
        
    }
`

const ResultWrap = styled.div`
    width: 100px;
`
