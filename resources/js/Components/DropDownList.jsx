
export default function DropDownList({value, onChange, listItem, attribute = 'max-w-36 sm:w-full'}){
    var css = attribute.concat(" ", "block p-2 text-sm text-gray-900 border border-blue-500 hover:opacity-75 hover:cursor-pointer rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500")
    return (
        <>
            <select id="default" onChange={onChange} class={css}>
                {listItem.map(({optionValue, icon, content})=>{
                    return (
                        <option data-content={icon} value={optionValue} selected={optionValue === value}>
                            <p>{content}</p>
                        </option>
                    )
                })}
            </select>
        </>
    )
}
