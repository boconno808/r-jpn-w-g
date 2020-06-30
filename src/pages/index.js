import React, { useState, useEffect, }  from "react"
import { Link } from "gatsby"
import Layout from "../components/layout"
import Loading from "../components/loading"
import WordDisplay from "../components/wordDisplay"

const IndexPage = () => {

  const [loadingText, setLoadingText] = useState('Loading Words...');
  const [doneLoading, setDoneLoading] = useState(false);
  const [error, setError] = useState(false);
  const [rndJpn, setrndJpn] = useState('');
  const [isCommon, setIsCommon] = useState(false);
  const [rndReading, setrndReading] = useState('');
  const [jlpt, setJlpt] = useState(undefined);
  const [rndEngDef, setrndEngDef] = useState('');


  useEffect(() => {
     handleGetWord();
  },[]);


  async function handleGetWord(){

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
            } return jpnResponse.json();
          }).then( json => {
            if (json.data.length > 0){
              console.log(json)
              console.log("JSON"+json.data[0].japanese[0].word);
              setLoadingText('Finished!');
              setDoneLoading(true);
              setrndJpn(json.data[0].japanese[0].word);
              setrndReading(json.data[0].japanese[0].reading);
              console.log(typeof json.data[0].jlpt[0]);
              setJlpt(json.data[0].jlpt[0])
              setIsCommon(json.data[0].is_common);
              setrndEngDef(json.data[0].senses[0].english_definitions[0]);
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
      <div
      style={{
        position: `absolute`,
        top: `15rem`,
        left: `50%`,
        transform: `translate(-50%, -50%)`,
        textAlign: `center`,
      }}>
      {
        !doneLoading && <Loading loadState = {loadingText}/>
      }
      {
        doneLoading &&
        < WordDisplay
          rndJpn = {rndJpn}
          rndReading = {rndReading}
          rndEngDef = {rndEngDef}
          jlpt = {jlpt}
          isCommon = {isCommon}
        />
      }
      {
        error &&
        <p>There was an error fetching the data :(</p>
      }
      </div>
    </Layout>
  )
}

export default IndexPage
