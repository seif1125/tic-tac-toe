export default function History({ history,goToMove,reset}) {
    return (
      <> 
      <div className='history-container'>
        <span>Game Status</span>
        <div>
         <button onClick={reset} disabled={history[0]?.length<=0} >
                Reset
      </button>
              {history.map((_, index) => {
        // Skip rendering a button for the last item in the parent history array
        if (index !== history.length - 1) {
          return (
            <button key={index} onClick={() => goToMove(index)}>
              Go to move {index + 1}
            </button>
          );
        }
        return null;
      })}
      </div>
      </div>
      </>
    );
  }