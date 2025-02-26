export const Loader = () =>{
    return (
        <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "80vh", // Adjust as needed
              width: "100%",
            }}
          >
            <div className="loader"></div> {/* Or use CircularProgress from MUI */}
          </div>
    )
}