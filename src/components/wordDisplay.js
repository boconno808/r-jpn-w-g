import React from 'react'

export default function WordDisplay({rndJpn, rndReading, rndEngDef, jlpt, isCommon}) {
  return (
    <>
      <div>
        {
          rndJpn === undefined ? (
            <div class="ui huge header">{rndReading}</div>
          ) : (
            <div class="ui huge header">{rndJpn}</div>
           )
        }
        {
          rndJpn !== undefined && <p>{rndReading}</p>
        }

        <div class="ui medium header"> Definition: {rndEngDef}</div>
        {
          (jlpt === undefined) ? (<p> The jlpt level is unknown </p>):(<p> The jlpt level of this word is {jlpt} </p>)
        }
        {
          isCommon ? (<p> This word is common </p>):(<p> This word is uncommon </p>)
        }
      </div>
    </>
  )
}
