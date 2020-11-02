import React, { useState, useEffect, }  from "react"
import Layout from "../components/layout"
import Loading from "../components/loading"
import WordDisplay from "../components/wordDisplay"
import AgainBtn from "../components/againBtn"
import Arrow from '../images/arrow.png'

const IndexPage = () => {

  const [loadingText, setLoadingText] = useState('Loading Words...');
  const [doneLoading, setDoneLoading] = useState(false);
  const [error, setError] = useState(false);

  const [rndJpn, setRndJpn] = useState('');
  const [isCommon, setIsCommon] = useState(false);
  const [rndReading, setRndReading] = useState('');
  const [jlpt, setJlpt] = useState(undefined);
  const [rndEngDef, setRndEngDef] = useState('');


  useEffect(() => {
     handleGetWord(true);
  },[]);


  async function handleGetWord({firstTime}){
    if (!firstTime){
      setDoneLoading(false);
      setError(false);
      setRndJpn('');
      setIsCommon(false);
      setRndReading('');
      setJlpt(undefined);
      setRndEngDef('');
    }

    fetch('https://random-word-api.herokuapp.com/word?number=200').then(response => {
        if (!response.ok) {
            setError(true);
            return Promise.reject(response);
        }
        return response;
    }).then(response => {
      setLoadingText('Loading Translation...');
      return response.json();
    }).then( response => {
      var wordsTried = 0;
      const proxyurl = "https://cors-anywhere.herokuapp.com/";
      var fetchJpn = () => {
        var currentWord = response[wordsTried];
        fetch(proxyurl+`https://jisho.org/api/v1/search/words?keyword=${currentWord}`).then(
          jpnResponse => {
            if (!jpnResponse.ok) {
                setError(true);
                return Promise.reject(jpnResponse);
            }
            setLoadingText('読み込み中...');
            return jpnResponse.json();
          }).then( json => {
            if (json.data.length > 0){
              setDoneLoading(true);
              setRndJpn(json.data[0].japanese[0].word);
              setRndReading(json.data[0].japanese[0].reading);
              setJlpt(json.data[0].jlpt[0])
              setIsCommon(json.data[0].is_common);
              setRndEngDef(json.data[0].senses[0].english_definitions[0]);
              setLoadingText('Loading Words...');
            } else {
              wordsTried = wordsTried + 1;
              fetchJpn();
            }
          })
      }
      return fetchJpn();
    }).catch(function(error) {
      setError(true);
      console.log(error);
    });
  }

  return (
    <Layout>
      <div>
      <img
      src={Arrow}
      alt="Arrow"
      style={{
        float: `left`,
      }}
      />
      <img
      src={Arrow}
      alt="Arrow"
      style={{
        float: `right`,
      }}
      />
        <div
        style={{
          position: `absolute`,
          top: `16rem`,
          left: `50%`,
          transform: `translate(-50%, -50%)`,
          textAlign: `center`,
        }}>
          {
            !doneLoading && !error && <Loading loadState = {loadingText}/>
          }
          {
            doneLoading && !error &&
            < WordDisplay
              rndJpn = {rndJpn}
              rndReading = {rndReading}
              rndEngDef = {rndEngDef}
              jlpt = {jlpt}
              isCommon = {isCommon}
            />
          }
          {
            doneLoading && !error &&
            <AgainBtn
              onClick = {() => handleGetWord(false)}
              onKeyDown = {() => handleGetWord(false)}
            />
          }
          {
            error &&
            <div>
              <h1>There was an error fetching the data... API is down... please come back later :(</h1>
              <AgainBtn
                onClick = {() => handleGetWord(false)}
                onKeyDown = {() => handleGetWord(false)}
              />
            </div>
          }
        </div>
      </div>
    </Layout>
  )
}

export default IndexPage
