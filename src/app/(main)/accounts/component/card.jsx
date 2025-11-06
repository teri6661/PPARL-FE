import { LuActivity, LuArrowUpRight, LuAward, LuBadge, LuBriefcase, LuFolderOpen, LuSmile, LuStar, LuTrendingUp, LuUser, LuUserCheck, LuZap } from "react-icons/lu";

const Card = () => {

  return (
    <div className="row">
      {/* Simulasi Card 1 */}
      <div className="col-md-6 col-lg-3">
        <div className="card shadow-sm p-4">
          <h5>TechCorp Inc.</h5>
          <p className="text-muted mb-1">Industry: <span className="fw-medium">Technology</span></p>
          <p className="text-muted mb-1">Contact: John Smith</p>
          <div className="mt-3"><button className="btn btn-primary-gradient w-100">View Details</button></div>
        </div>
      </div>
      {/* Simulasi Card 2 */}
      <div className="col-md-6 col-lg-3">
        <div className="card shadow-sm p-4">
          <h5>InnovateHub</h5>
          <p className="text-muted mb-1">Industry: <span className="fw-medium">Consulting</span></p>
          <p className="text-muted mb-1">Contact: Emma Wilson</p>
          <div className="mt-3"><button className="btn btn-primary-gradient w-100">View Details</button></div>
        </div>
      </div>
      <div className="col-12"><small className="text-muted">Showing 2 of 2 results</small></div>
    </div>
  )
}

export default Card;