import {Link} from "react-router-dom";


export function BottomWarning({label,buttonText,to}){
    return <div className="flex">
         <p className="text-sm text-gray-500">
          {label}
        </p>
        <Link className="text-sm text-gray-500 pointer underline" to={to}>
        {buttonText}
      </Link>
    </div>
}