export default function Checkbox({ className = '', ...props }) {
    return (
        <input
            {...props}
            type="checkbox"
            className={
                'rounded border-gray-300 text-blue-500 shadow-sm focus:ring-blue-400 cursor-pointer ' +
                className
            }
        />
    );
}
