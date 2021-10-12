   
## How to contribute: 
1. Fork the [Worktez](https://github.com/Worktez/worktez) repository.
2. Clone your fork: `git clone <your forked repository>`
3. Set Upstream: `git remote add upstream  <Original Repository>`
4. Check the upstream: `git remote -v`
5. Run command `npm install`.
6. Install latest Angular: `npm install -g @angular/cli`
7. Install firebase using the following commands
    * `npm install -g firebase-tools`
    * `firebase login`
    * `firebase init`
8. To deploy a firebase project, use `firebase deploy` command.
9. Create a branch: `git branch <your branch name>`
10. Check out your branch: `git checkout <your branch name>`
11. Go to /environments
12. Enter your Firebase key in environment.ts file and project Id in .firebaserc file.
13. Run `ng serve` and `firebase emulators:start` from /worktrolly-ui
14. Login to worktrolly-ui using google auto-generated credentials.
15. Click the button “auto setup”.
16. Type your team Id in the "SelectedTeamId" column and go back to [worktez](localhost:4200) to view your changes.
17. Make changes and commit them: `git commit -a`
18. Push your changes:  `git push --set-upstream origin <your branch name>`
19. Raise a pull request to Upstream dev-angular branch
20. Pull all new changes from dev-angular using: `git pull upstream dev-angular` to your new branch to contribute again.
 
#### Note:
You will be able to access the localhost and auto-setup button only if the emulator is running parallelly throughout the process.
