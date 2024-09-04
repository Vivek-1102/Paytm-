export function Input({label,type,placeholder,onChange}){
    return <>
         <div>
        <label className="sr-only">{label}</label>
        <input
            onChange={onChange}
            type={type}
            className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
            placeholder={placeholder}
          />
      </div>
    </>
}