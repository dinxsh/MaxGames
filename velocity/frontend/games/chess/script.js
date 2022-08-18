function otherColor(color) {
    return color === "white" ? "black" : "white";
  }
  
  function enableDrag(chessPiece) {
    chessPiece.setAttribute("draggable", true);
    chessPiece.classList.add("draggable");
  }
  
  function disableDrag(chessPiece) {
    chessPiece.setAttribute("draggable", false);
    chessPiece.classList.remove("draggable");
  }
  
  function disableAll(...colors) {
    colors.forEach(color => {
      const chessPieces = document.querySelectorAll(`.${color}`);
      chessPieces.forEach(chessPiece => disableDrag(chessPiece));
    });
  }
  
  function disableAndEnablePieces(currColor, nextColor) {
  
    const currTurn = document.querySelectorAll(`.${currColor}`);
    currTurn.forEach(chessPiece => disableDrag(chessPiece));
  
    const nextTurn = document.querySelectorAll(`.${nextColor}`);
    nextTurn.forEach(chessPiece => enableDrag(chessPiece));
  }
  
  function applyPropOneChessPiece(chessPiece, chessboardPosition) {
  
    const chessPiecesProp = ["pawn", 0, 2, 0,
                             "rook", 7, 7, 0,
                             "knight", [1, 2], [2, 1], 0,
                             "bishop", 0, 0, 7,
                             "queen", 7, 7, 7,
                             "king", 1, 1, 1];
  
    const createPieceParams = (el, local, h, v, d) => el.piece = { local, h, v, d };
  
    const nameChessPiece = chessPiece.classList[1];
    const indexInProps = chessPiecesProp.indexOf(nameChessPiece);
    const pieceProps = [chessPiecesProp[indexInProps + 1],
                        chessPiecesProp[indexInProps + 2],
                        chessPiecesProp[indexInProps + 3]];
  
    createPieceParams(chessPiece, chessboardPosition,
      pieceProps[0], pieceProps[1], pieceProps[2]);
  
  }
  
  function applyPropChessPieces(piecesColor, chessboardPosition) {
  
    const chessPiecesClass = document.querySelectorAll(`.${piecesColor}`);
    chessPiecesClass.forEach(chessPiece => {
      applyPropOneChessPiece(chessPiece, chessboardPosition);
    });
  
  }
  
  function clearZonesByClassName(...classNames) {
    classNames.forEach(className => {
      const zones = document.querySelectorAll(`.${className}`);
      const removeClassName = className.split(".");
      zones.forEach(zone => zone.classList.remove(removeClassName[0]));
    });
  }
  
  const searchSquares = function (maxValue, currLine, lSign, currCol, cSign, color) {
        
    for (let i = 1; i <= maxValue; i++) {
  
      const line = document.getElementsByClassName(`l${currLine + lSign * i}`)[0];
  
      if (line) {
        const square = line.getElementsByClassName(`c${currCol + cSign * i}`)[0];
  
        if (square) {
          if (square.firstElementChild) {
            if (square.firstElementChild.classList[0] !== color) {
              square.classList.add("capture");
            }
            break;
          }
          square.classList.add("dropzone");
        }
      }
    }
  }
  
  const showPossibleDropZones = function (el) {
  
    const elColor = el.classList[0];
  
    const getCurrentLocation = parent => parseInt(parent.classList[1].split("")[1]);
  
    const column = getCurrentLocation(el.parentNode);
    const line = getCurrentLocation(el.parentNode.parentNode);
  
    const squaresInBack = (curr, moves) => curr - moves < 1 ? (curr - 1) : moves;
    const squaresInFront = (curr, moves) => curr + moves > 8 ? (8 - curr) : moves;
  
    if (!el.piece.v.length && el.piece.v > 0 && !el.classList.contains("pawn")) {
        // Check vertical squares
        const maxSouth = squaresInBack(line, el.piece.v);
        searchSquares(maxSouth, line, -1, column, 0, elColor);
  
        const maxNorth = squaresInFront(line, el.piece.v);  
        searchSquares(maxNorth, line, +1, column, 0, elColor);
    }
  
    if (!el.piece.h.length && el.piece.h > 0) {
        // Check horizontal squares
        const maxWest = squaresInBack(column, el.piece.h);
        searchSquares(maxWest, line, 0, column, -1, elColor);
  
        const maxEast = squaresInFront(column, el.piece.h);
        searchSquares(maxEast, line, 0, column, +1, elColor);
    }
  
    if (el.classList.contains("knight")) {
      // Check squares for L moves
      const sign = [-1, +1];
  
      for (let i = 0; i < el.piece.v.length; i++) {
        for (let j = 0; j < sign.length; j++) {
          for (let k = 0; k < sign.length; k++) {
            searchSquares(1, line, sign[j] * el.piece.v[i], column, sign[k] * el.piece.h[i], elColor);
            searchSquares(1, line, sign[j] * el.piece.v[i], column, sign[k] * el.piece.h[i], elColor);
          }
        }
      }
    }
  
    if (el.piece.d > 0) {
      // Check diagonal squares
      const maxSouth = squaresInBack(line, el.piece.d);
      searchSquares(maxSouth, line, -1, column, -1, elColor);
      searchSquares(maxSouth, line, -1, column, +1, elColor);
  
      const maxNorth = squaresInFront(line, el.piece.d);
      searchSquares(maxNorth, line, +1, column, -1, elColor);
      searchSquares(maxNorth, line, +1, column, +1, elColor);
    }
  
    if (el.classList.contains("pawn")) {
      
      if(el.piece.local === "top") {
        const maxDiag = squaresInBack(line, 1);
        searchSquares(maxDiag, line, -1, column, -1, elColor);
        searchSquares(maxDiag, line, -1, column, +1, elColor);
        clearZonesByClassName("dropzone");
  
        const maxSouth = squaresInBack(line, el.piece.v);
        searchSquares(maxSouth, line, -1, column, 0, elColor);
        clearZonesByClassName(`capture.c${column}`);
        
      } else {
        const maxDiag = squaresInBack(line, 1);
        searchSquares(maxDiag, line, +1, column, -1, elColor);
        searchSquares(maxDiag, line, +1, column, +1, elColor);
        clearZonesByClassName("dropzone");
  
        const maxNorth = squaresInFront(line, el.piece.v);
        searchSquares(maxNorth, line, +1, column, 0, elColor);
        clearZonesByClassName(`capture.c${column}`);
      }
    }
  }
  
  function checkDropZones(event) {
  
    const changeDropZones = function (target) {
      const classList = target.classList;
    
      if (classList.contains("dragover")) {
        classList.remove("dragover");
      } else {
        classList.add("dragover");
      }
    }
  
    const target = event.target;
    const classList = target.classList;
    const parentClassList = target.parentNode.classList;
  
    if (classList.contains("dropzone")) {
      changeDropZones(target);
      return target;
    } else if (parentClassList) {
      if (parentClassList.contains("capture")) {
        changeDropZones(target.parentNode);
        return target.parentNode;
      }
    } else {
      return;
    }
  }
  
  function movePiece(chessPiece, currPosition, nextPosition) {
    currPosition.removeChild(chessPiece);
    nextPosition.appendChild(chessPiece);
  }
  
  
  function captureOpponentPiece(currSquare, pieceColor) {
    // Check if drop occurs with a capture
    if (currSquare.firstElementChild) {
  
      const capturedPiece = currSquare.firstElementChild;
      disableDrag(capturedPiece);
      
      const capturedZone = document.getElementById(`cz${pieceColor}`);
      movePiece(capturedPiece, currSquare, capturedZone);
      
      return capturedPiece.classList.contains("king");
  
    }
    
    return false;
  
  }
  
  
  function checkmate(chessPiece, color) {
    
    showPossibleDropZones(chessPiece);
    const captureSquares = document.getElementsByClassName("capture");
    const opponentColor = otherColor(color);
    
    for (let i = 0; i < captureSquares.length; i++) {
      
      const possibleCapture = captureSquares[i].firstElementChild;
      const isCheckmate = possibleCapture.classList.contains("king") &&
            possibleCapture.classList.contains(opponentColor);
      
      if (isCheckmate) {
        return isCheckmate;
      }
  
    }
    
    return false;
    
  }
  
  function playerTurn(color) {
  
    const countdownTimer = document.getElementById(`ct${color}`);
    const time = countdownTimer.innerHTML;
    let minutes = parseInt(time.split(":")[0]);
    let seconds = parseInt(time.split(":")[1]);
  
    let timer;
  
    function turn() {
  
      seconds--;
  
      if (seconds < 0) {
        seconds = 59;
        minutes--;
      }
  
      if (minutes < 0) {
        clearInterval(timer);
        endGame(color, true);
      } else {
  
        let minutesStr = `${minutes}`;
        minutesStr = minutesStr.length < 2 ? "0" + minutesStr : minutesStr;
  
        let secondsStr = `${seconds}`;
        secondsStr = secondsStr.length < 2 ? "0" + secondsStr : secondsStr;
  
        countdownTimer.innerHTML = `${minutesStr}:${secondsStr}`;
      }
  
    }
    
    return {
      start() {
        timer = setInterval(turn, 1000)
      },
      stop() {
        clearInterval(timer)
      }
    }
  
  }
  
  /* 
    Main
  */
  
  applyPropChessPieces("white", "bottom");
  applyPropChessPieces("black", "top");
  let pieceDragged;
  
  const whiteTurn = playerTurn("white");
  const blackTurn = playerTurn("black");
  
  const startDelay = setTimeout(() => {
    whiteTurn.start();
    disableAndEnablePieces("black", "white");
  }, 3000);
  
  
  function endGame(color, endedByTime) {
  
    whiteTurn.stop();
    blackTurn.stop();
    disableAll("white", "black");
  
    if (endedByTime) {
      const opponentColor = otherColor(color);
      alert(`${opponentColor.toUpperCase()} WINS!!!`);
    } else {
      alert(`${color.toUpperCase()} WINS!!!`);
    }
  
  }
  
  function changeTurn(color, isCheckmate, isKingCaptured) {
    
    if (isKingCaptured) {
      endGame(color, false);
  
    } else {
  
      let justKing = "";
      if (isCheckmate) {
        justKing = ".king";
      }
  
      if (color === "white") {
  
        whiteTurn.stop();
        blackTurn.start();
        disableAndEnablePieces("white", `black${justKing}`);
  
      } else if (color === "black") {
  
        blackTurn.stop();
        whiteTurn.start();
        disableAndEnablePieces("black", `white${justKing}`);
  
      }
  
    }
  
  }
  
  function verifyCheckmateAndChangeTurn(chessPiece, pieceColor, isKingCaptured) {
    const isCheckmate = checkmate(chessPiece, pieceColor);
    changeTurn(pieceColor, isCheckmate, isKingCaptured);
    clearZonesByClassName("dropzone", "capture");
  }
  
  function applyPawnExceptions(chessPiece, currSquare, pieceColor, isKingCaptured) {
    // Update pawn movement 
    chessPiece.piece.v = 1;
  
    // Check if pawn arrived at the other side of the chessboard
    const chessboardSide = pieceDragged.piece.local;
    const opponentSide = chessboardSide === "bottom" ? "l8" : "l1";
  
    if (currSquare.parentNode.classList.contains(opponentSide)) {
  
      let dropDownSelector = '<div id="piece-selector">';
      dropDownSelector += '<a name="knight">♞</a>';
      dropDownSelector += '<a name="queen">♛</a>';
      dropDownSelector += '<a name="rook">♜</a>';
      dropDownSelector += '<a name="bishop">♝</a>';
      dropDownSelector += '</div>';
  
      currSquare.innerHTML = dropDownSelector;
  
      const pieceSelector = document.getElementById("piece-selector");
      pieceSelector.style.color = pieceColor;
  
      pieceSelector.addEventListener("click", e => {
        const chosenPieceName = e.target.name;
        const chosenPiece = e.target.innerHTML;
  
        let newPiece = `<div class=`;
        newPiece += `"${pieceColor} ${chosenPieceName}">`;
        newPiece += `${chosenPiece}</div>`;
  
        currSquare.innerHTML = newPiece;
  
        applyPropOneChessPiece(currSquare.firstElementChild, chessboardSide);
  
        verifyCheckmateAndChangeTurn(currSquare.firstElementChild, pieceColor, isKingCaptured);
  
      });
    } else {
      verifyCheckmateAndChangeTurn(chessPiece, pieceColor, isKingCaptured);
    }
  
  }
  
  
  /* Event Listeners */
  document.addEventListener("mousedown", event => {
    const target = event.target;
    if (target.draggable) {
      showPossibleDropZones(target);
    }
  });
  
  document.addEventListener("mouseup", () => {
      clearZonesByClassName("dropzone", "capture");
  });
  
  
  document.addEventListener("dragstart", event => {
    if (event.target.draggable) {
      pieceDragged = event.target;
      pieceDragged.classList.add("dragging");
    }
  });
  
  document.addEventListener("dragend", () => {
    if (pieceDragged) {
      pieceDragged.classList.remove("dragging");
    }
    
  });
  
  document.addEventListener("dragover", event => {
    event.preventDefault();
  }, false);
  
  document.addEventListener("dragenter", checkDropZones);
  
  document.addEventListener("dragleave", checkDropZones);
  
  document.addEventListener("drop", event => {
    event.preventDefault();
  
    const target = checkDropZones(event);
    if (target) {
  
      const pieceColor = pieceDragged.classList[0];
  
      const isKingCaptured = captureOpponentPiece(target, pieceColor);
  
      movePiece(pieceDragged, pieceDragged.parentNode, target);
      
      if (pieceDragged.classList.contains("pawn")) {
        applyPawnExceptions(pieceDragged, target, pieceColor, isKingCaptured);
      } else {
        verifyCheckmateAndChangeTurn(pieceDragged, pieceColor, isKingCaptured);
      }
  
    }
    
    clearZonesByClassName("dropzone", "capture");
  
  });