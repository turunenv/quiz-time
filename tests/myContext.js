//exports a mocking context-object to test wheather controllers are rendering correct eta-files

export default function myContext (controllerFunction) {
    let usedParametervalue = null;
    
    const myRenderFunction = parameter => {
        usedParametervalue = parameter;
    };

    const mockedContext = {
        render: myRenderFunction,
    };

    controllerFunction(mockedContext);

    return usedParametervalue;
};
