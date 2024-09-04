export function Button({name,onClick}){
    return <>
       <button
          onClick={onClick}
          type="submit"
          className="inline-block rounded-lg bg-blue-500 px-5 py-3 text-sm font-medium text-white"
        >
          {name}
        </button> 
    </>
}