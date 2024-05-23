var cellWidth = 128 * 2;
var cellHeight = 128 * 2;
var columnCount = 7;
var rowCount = 4;
var cellArray = [];
var cellsLoaded = 0;

window.onload = setupGrid;
window.onresize = resizeGrid;

function onkeydown(event)
{
    for (let y = 0; y < rowCount; y++)
    {  
        for (let x = 0; x < columnCount; x++)
        { 
            var frameId = y * columnCount + x + 1;
            cellArray[frameId].contentWindow.document.dispatchEvent(new KeyboardEvent("keydown", event));
        }
    }
}

function onkeyup(event)
{
    for (let y = 0; y < rowCount; y++)
    {  
        for (let x = 0; x < columnCount; x++)
        { 
            var frameId = y * columnCount + x + 1;
            cellArray[frameId].contentWindow.document.dispatchEvent(new KeyboardEvent("keyup", event));
        }
    }
}

function setupGrid()
{
    for (let y = 0; y < rowCount; y++)
    {  
        for (let x = 0; x < columnCount; x++)
        { 
            var frameId = y * columnCount + x + 1;
            var cell = document.createElement("iframe");

            cell.id = frameId.toString();
            cell.src = "1.html";//frameId.toString() + ".html";

            cellArray[frameId] = cell;
            document.body.appendChild(cellArray[frameId]);

            cellArray[frameId].onload = function() 
            { 
                cellsLoaded += 1; 
                
                if (cellsLoaded >= y * x) 
                {
                    resizeGrid();
                }
            };
        }
    }  
    
    console.log("here");
    addEventListener("keydown", onkeydown);
    addEventListener("keyup", onkeyup);
}

function resizeGrid()
{
    var gridWidth = cellWidth * columnCount;
    var gridHeight = cellHeight * rowCount;

    for (let y = 0; y < rowCount; y++)
    {  
        for (let x = 0; x < columnCount; x++)
        { 
            var frameId = y * columnCount + x + 1;
            var left = x * cellWidth + (window.innerWidth - gridWidth) / 2;
            var top = y * cellHeight + (window.innerHeight - gridHeight) / 2;

            cellArray[frameId].style.width = cellWidth.toString() + "px";
            cellArray[frameId].style.height = cellHeight.toString() + "px";
            cellArray[frameId].style.left = left.toString() + "px";
            cellArray[frameId].style.top = top.toString() + "px";
        }
    }
}