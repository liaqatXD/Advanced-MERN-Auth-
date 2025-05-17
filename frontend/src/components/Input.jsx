const Input = ({ icon: Icon, ...props }) => {
  return (
    <div className="relative my-6">
      <Icon
        className="absolute top-3 left-1.5 text-white size-5 
            "
      />
      <input
        {...props}
        className="text-white
border-1 rounded-md border-white  py-2 pl-8 
w-full 
block  
outline-0 focus:outline-blue-500
 focus:outline-2 focus:outline-offset-1 
transition-[outline] duration-100 "
      />
    </div>
  );
};

export default Input;
