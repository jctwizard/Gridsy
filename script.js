// TODO:
// - store frame elements in an array
// - fix syncing
// - make iframes not individually interactable

var cellWidth = 256;
var cellHeight = 256;
var columnCount = 3;
var rowCount = 3;

window.onload = setupGrid;
window.onresize = resizeGrid;

function onkeydown(event)
{
    for (let x = 0; x < columnCount; x++)
    { 
        for (let y = 0; y < rowCount; y++)
        {  
            var frameId = y * rowCount + x + 1;
            var frame = document.getElementById(frameId.toString());
            frame.contentWindow.document.dispatchEvent(new KeyboardEvent("keydown", event));
        }
    }
}

function onkeyup(event)
{
    for (let x = 0; x < columnCount; x++)
    { 
        for (let y = 0; y < rowCount; y++)
        {  
            var frameId = y * rowCount + x + 1;
            var frame = document.getElementById(frameId.toString());
            frame.contentWindow.document.dispatchEvent(new KeyboardEvent("keyup", event));
        }
    }
}

function setupGrid()
{
    for (let x = 0; x < columnCount; x++)
    { 
        for (let y = 0; y < rowCount; y++)
        {  
            var frameId = y * rowCount + x + 1;
            var cell = document.createElement("iframe");

            cell.id = frameId.toString();
            cell.src = frameId.toString() + ".html";
            document.body.appendChild(cell);
        }
    }  
    
    addEventListener("keydown", onkeydown);
    addEventListener("keyup", onkeyup);

    resizeGrid();
}

function resizeGrid()
{
    var bodyWidth = cellWidth * columnCount;
    document.body.style.width = bodyWidth.toString() + "px";

    var bodyHeight = cellHeight * rowCount;
    document.body.style.height = bodyHeight.toString() + "px";

    for (let x = 0; x < columnCount; x++)
    { 
        for (let y = 0; y < rowCount; y++)
        {  
            var frameId = y * rowCount + x + 1;
            var frame = document.getElementById(frameId.toString());
            var left = x * cellWidth + (window.innerWidth - bodyWidth) / 2;
            var top = y * cellHeight + (window.innerHeight - bodyHeight) / 2;

            frame.style.left = left.toString() + "px";
            frame.style.top = top.toString() + "px";
        }
    }
}