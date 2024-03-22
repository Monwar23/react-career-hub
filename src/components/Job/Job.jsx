
const Job = ({job}) => {
const {logo}=job

    return (
        <div>
            <img className="w-44" src={logo} alt="" />
        </div>
    );
};

export default Job;