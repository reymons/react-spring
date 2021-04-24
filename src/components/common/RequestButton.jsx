import gif from "./../../assets/preloaders/buttonPreloader.gif"

const requestStyles = {
  background: `url(${gif}) no-repeat center`,
  backgroundSize: "contain",
}

const RequestButton = ({ children, requestCondition ,...attributes }) => {
  return (
    <>
    {
      requestCondition
      ? <button { ...attributes } disabled={true} style={requestStyles}>
          { children }
        </button>
      : <button { ...attributes }>
          { children }
        </button>
    }
    </>
  )
}

export default RequestButton;