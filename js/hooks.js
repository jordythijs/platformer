function hooks(hook) {
    switch (hook) {
        case "preMoveRight":
            hookPreMove();
            hookPreMoveRight();
            break;
        case "postMoveRight":
            hookPostMove();
            hookPostMoveRight();
    }
}

function hookPreMove() {}
function hookPreMoveRight() {}
function hookPostMove() {
    // Keep falling if there's no standing block underneath the player
}
function hookPostMoveRight() {}
