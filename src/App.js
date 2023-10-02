import { useState } from "react";
import "./styles.css";

let image = "https://m.media-amazon.com/images/I/91tzcpQRDJL._AC_SX522_.jpg";

export default function App() {
  const [arrayDotData, setArrayDotData] = useState([]);
  const [isModal, setIsModal] = useState(false);
  const [errors, setErrors] = useState("");
  const [hoverIndex, setIsHoverIndex] = useState(null);

  let data = {
    cordinates: [],
    item: ""
  };
  console.log(arrayDotData?.length, "arrayDotData?.length");
  function getTopLeftInPercent(event) {
    event.preventDefault();

    if (
      arrayDotData?.length > 0 &&
      !arrayDotData[arrayDotData?.length - 1]?.item
    ) {
      setErrors("Enter Details First");
      return;
    }

    // Get the size of the parent container (relative <div>)
    const containerWidth = event.target.clientWidth;
    const containerHeight = event.target.clientHeight;

    // Calculate the position in percentage
    const xPercent = (event.nativeEvent.offsetX / containerWidth) * 100;
    const yPercent = (event.nativeEvent.offsetY / containerHeight) * 100;

    // Display the result
    data.cordinates[0] = xPercent.toFixed(2);
    data.cordinates[1] = yPercent.toFixed(2);

    setArrayDotData([...arrayDotData, data]);
    setIsModal(true);
    console.log(
      `Top-Left Position: (${xPercent.toFixed(2)}%, ${yPercent.toFixed(2)}%)`
    );
  }
  const openUrl = (e, data1) => {
    e.stopPropagation();
    window.open(data1, "_blank");
  };
  console.log(arrayDotData);
  const handleOnChamge = (e, index) => {
    let value = [...arrayDotData];
    value[index].item = e.target.value;
    setArrayDotData(value);
    setErrors("");
  };
  const handleSubmit = (e, index) => {
    // let value = [...arrayDotData];
    // value[index].item = text;
    // setArrayDotData(value);
    setIsModal(false);
    setIsHoverIndex(null);
  };
  const removeItemData = (e, index) => {
    e.preventDefault();
    e.stopPropagation();
    let value = [...arrayDotData];
    value.splice(index, 1);
    setArrayDotData(value);
    setIsModal(false);
    setErrors("");
  };

  return (
    <div className="App">
      <div className="image-div" onClick={(e) => getTopLeftInPercent(e)}>
        {arrayDotData.map((data, index) => {
          return (
            <span
              key={index}
              className="dot"
              style={{
                position: "absolute",
                top: `${data.cordinates[1]}%`,
                left: `${data.cordinates[0]}%`
              }}
              // onClick={(e) => openUrl(e, data.item)}
              onClick={(e) => removeItemData(e, index)}
              onMouseOver={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setIsHoverIndex(index);
              }}
              // onMouseLeave={(e) => {
              //   e.preventDefault();
              //   e.stopPropagation();
              //   setIsHoverIndex(null);
              // }}
              role="img"
              aria-label="img"
            >
              {hoverIndex === index && !isModal ? "😂" : "😁"}
            </span>
          );
        })}
        <img src={image} alt="Example" />
      </div>
      {isModal && (
        <div className="modal">
          <input
            type="text"
            onChange={(e) => handleOnChamge(e, arrayDotData?.length - 1)}
          />
          <button
            onClick={(e) => {
              handleSubmit(e, arrayDotData?.length - 1);
            }}
          >
            Submit
          </button>
          <br />
          {errors && <span>{errors}</span>}
        </div>
      )}
      <div>
        {arrayDotData.map((data, index) => {
          return (
            <>
              <span key={index} role="img" aria-label="img">
                {hoverIndex === index && !isModal ? (
                  <>
                    <input
                      value={data.item}
                      onChange={(e) => handleOnChamge(e, index)}
                    />
                    <button onClick={(e) => handleSubmit(e, index)}>
                      update
                    </button>
                  </>
                ) : (
                  data.item
                )}
              </span>
              <br />
            </>
          );
        })}
      </div>
    </div>
  );
}
