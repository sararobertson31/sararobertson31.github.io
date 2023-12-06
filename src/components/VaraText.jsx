import { useEffect, useRef } from "react";
import Vara from "vara";

const VaraText = ({title}) => {
    const ref = useRef();
    useEffect(() => {
        console.log(ref.current)
        if (ref.current && !ref.current.innerHTML) {
            new Vara("#text", "SatisfySL.json", [
            {
                text: title,
                fontSize: 96,
                textAlign: 'center',
                color: 'white',
                strokeWidth: 2,
            },
            ]);
        }
  }, [title]);
    return <div id="text" ref={ref} style={{width: '100%', height: 96.5}}></div>
}

export default VaraText;