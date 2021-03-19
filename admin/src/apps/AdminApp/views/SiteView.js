

export default SiteView


function SiteView() {
    return <iframe src={ process.env.REACT_APP_FRONTEND_URL } title="A preview of the current homepage." className="site-frame" style={{ border: "none", borderLeft: "1px solid gray", width: "100%", height: "100vh" }}></iframe>
}