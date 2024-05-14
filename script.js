// Using Bitsy v4.9 (last version before onkeydown function was changed to store movement variables - causing desync of movement)
// https://github.com/le-doux/bitsy/commit/25949c0433fa55ac72c563b9941ca74e1a93cffa

// TODO:
// - store frame elements in an array
// - make iframes not individually interactable

var cellWidth = 128;
var cellHeight = 128;
var columnCount = 7;
var rowCount = 4;

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
            cell.src = "1.html";//frameId.toString() + ".html";
            document.body.appendChild(cell);
        }
    }  
    
    addEventListener("keydown", onkeydown);
    addEventListener("keyup", onkeyup);


    // wait here for loading to finish. resize frame function?
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

            frame.style.width = cellWidth.toString() + "px";
            frame.style.height = cellHeight.toString() + "px";
            frame.style.left = left.toString() + "px";
            frame.style.top = top.toString() + "px";
        }
    }
}