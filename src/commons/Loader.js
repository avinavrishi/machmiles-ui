export const Loader = ({height='80vh'}) =>{
    return (
        <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: height, // Adjust as needed
              width: "100%",
            }}
          >
            <div className="loader"></div> {/* Or use CircularProgress from MUI */}
          </div>
    )
}