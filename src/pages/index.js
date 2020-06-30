import React, { useState, useEffect, useContext, }  from "react"
import { Link } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { GlobalDispatchContext, GlobalStateContext,} from '../context/GlobalContextProvider'

const IndexPage = () => {

  const [loadingWords, setLoadingWords] = useState(true);
  const [loadingJpn, setLoadingJpn] = useState(true);
  const [error, setError] = useState(false);
  const [wotdJpn, setwotdJpn] = useState('');
  const [isCommon, setIsCommon] = useState(false);
  const [wotdReading, setWotdReading] = useState('');
  const [jlpt, setJlpt] = useState(undefined);
  const [wotdEngDef, setwotdEngDef] = useState('');

  const dispatch = useContext(GlobalDispatchContext)
  const state = useContext(GlobalStateContext)
  console.log(state)
  console.log(dispatch)

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
      setLoadingWords(false);
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
              setLoadingJpn(false);
              setwotdJpn(json.data[0].japanese[0].word);
              setWotdReading(json.data[0].japanese[0].reading);
              console.log(typeof json.data[0].jlpt[0]);
              setJlpt(json.data[0].jlpt[0])
              setIsCommon(json.data[0].is_common);
              setwotdEngDef(json.data[0].senses[0].english_definitions[0]);
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
      <SEO title="Home" />
      <h1>{wotdJpn}</h1>
      <h4>{wotdReading}</h4>
      <p> Definition: {wotdEngDef}</p>
      {
        loadingWords && (<p>LOADING RANDOM WORD...</p>
        )
      }
      {
        loadingJpn && (<p>LOADING TRANSLATION...</p>
        )
      }
      {
        error &&
        <p>There was an error fetching the data :(</p>
      }
      {
        (jlpt === undefined) ? (<p> The jlpt level is unknown </p>):(<p> The jlpt level of this word is {jlpt} </p>)
      }
      {
        isCommon ? (<p> This word is common </p>):(<p> This word is uncommon </p>)
      }
      <p>Counter: </p>
      <button className = "ui green button">+</button><button className = "ui red button">-</button>

      <div>
        <button
        style={{marginTop: '1.5rem'}}
        className = "ui blue button"
        onClick={() => {
           dispatch({ type: "LOADING_TRANS" })
         }}
        >
          Login
        </button>
      </div>
    </Layout>
  )
}

export default IndexPage
