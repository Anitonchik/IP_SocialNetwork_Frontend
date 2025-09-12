import "../../../styles.css"

const Settings = () => {
    return (
        
        <div className="d-flex flex-md-row-reverse flex-column container gap-md-3" style={{maxWidth: '1000px', height: '100hv'}}>

            <div className="text-center container container-background setting-profile col-md-3">
                <div className="input-file-row">
                    <img className="profile" style={{width: '80px', height: '80px'}} src="profile/ava.jpg" alt="avatar"/>
                </div>
                <div>
                    <div className="d-flex justify-content-between">
                        <div className="setting-text">Status</div>
                        <div className="setting-inf">never give up</div>
                    </div>
                </div>
            </div>

            <div className="container container-background col-12 col-md-9">
                <div className="d-flex justify-content-between setting">
                    <div className="setting-text">Name</div>
                    <div className="setting-inf">Firdovsi</div>
                </div>
                <div className="d-flex justify-content-between setting">
                    <div className="setting-text">Surname</div>
                    <div className="setting-inf">Mavrina</div>
                </div>
                <div className="d-flex justify-content-between setting">
                    <div className="setting-text">Page address</div>
                    <div className="setting-inf">https://NW/profile</div>
                </div>
                <div className="d-flex justify-content-between setting">
                    <div className="setting-text">Phone</div>
                    <div className="setting-inf">+7 ... ... .. 33</div>
                </div>
                <div className="d-flex justify-content-between setting">
                    <div className="setting-text">Main mail</div>
                    <div className="setting-inf">an...gmail.com</div>
                </div>
                <div className="d-flex justify-content-between setting">
                    <div className="setting-text">Gender</div>
                    <div className="setting-inf">Female</div>
                </div>
                <div className="d-flex justify-content-between setting">
                    <div className="setting-text">Language</div>
                    <div className="setting-inf">English</div>
                </div>
            </div>
        </div>
        
    )
}

export default Settings;